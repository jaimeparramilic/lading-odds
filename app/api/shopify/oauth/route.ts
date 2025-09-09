// app/api/shopify/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // Node para crypto estable

// ===== Entorno =====
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_API_VERSION,
  APP_URL: RAW_APP_URL,
  MAX_TIMESTAMP_SKEW_SEC = "600", // 10 min por defecto
} = process.env;

// Normaliza APP_URL (quita "/" finales)
const APP_URL = (RAW_APP_URL || "").replace(/\/+$/, "");

// Regex segura para tiendas Shopify
const SHOP_DOMAIN_RE = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i;

// ===== Helpers de respuesta (no-store) =====
function jsonNoStore(status: number, body: unknown) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
function htmlNoStore(html: string, status = 200) {
  return new NextResponse(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

// ===== Utilidades =====
function originFromReq(req: NextRequest) {
  const xfProto = (req.headers.get("x-forwarded-proto") || "https").split(",")[0].trim();
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").split(",")[0].trim();
  if (!host) return undefined;
  return `${xfProto}://${host}`;
}

// ===== HMAC helpers (canonical Shopify) =====
const LOCAL_PARAMS = new Set(["hmac", "signature", "debug", "format", "check", "dryrun"]);

function safeEqualHex(aHex: string, bHex: string) {
  if (!aHex || !bHex) return false;
  const a = Buffer.from(aHex.toLowerCase(), "hex");
  const b = Buffer.from(bHex.toLowerCase(), "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Mensaje canónico:
 * - Toma TODOS los query params excepto hmac/signature y flags locales
 * - Ordena por clave y, si se repite, por valor (estable)
 * - key=value unidos por '&' con valores decodificados
 */
function buildCanonicalMessage(url: URL) {
  const keys = Array.from(new Set(Array.from(url.searchParams.keys())));
  const entries: Array<[string, string]> = [];
  for (const k of keys) {
    if (LOCAL_PARAMS.has(k)) continue;
    for (const v of url.searchParams.getAll(k)) entries.push([k, v]);
  }
  entries.sort((a, b) => (a[0] === b[0] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0])));
  return entries.map(([k, v]) => `${k}=${v}`).join("&");
}

function verifyShopifyHmac(url: URL, secret: string) {
  const given = (url.searchParams.get("hmac") || "").toLowerCase();
  const message = buildCanonicalMessage(url);
  const digest = crypto.createHmac("sha256", secret).update(message, "utf8").digest("hex");
  return { ok: safeEqualHex(digest, given), given_hmac: given, message, digest };
}

// ===== Handler =====
export async function GET(req: NextRequest) {
  // 0) Validación de env
  if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET || !SHOPIFY_SCOPES || !APP_URL) {
    return jsonNoStore(500, {
      error: "Faltan variables de entorno",
      SHOPIFY_API_KEY: !!SHOPIFY_API_KEY,
      SHOPIFY_API_SECRET: !!SHOPIFY_API_SECRET,
      SHOPIFY_SCOPES: !!SHOPIFY_SCOPES,
      APP_URL,
      tip: "Configura SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SCOPES y APP_URL (sin slash final).",
    });
  }

  const fullUrl = req.url;
  const url = new URL(fullUrl);
  const secure = process.env.NODE_ENV === "production";
  const reqOrigin = originFromReq(req);
  const redirectUri = `${APP_URL}/api/shopify/oauth`;

  // Parámetros request
  const shopParam = url.searchParams.get("shop") || req.cookies.get("shopify_shop")?.value || "";
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const timestamp = url.searchParams.get("timestamp") || "";
  const format = url.searchParams.get("format");
  const check = url.searchParams.get("check");
  const dryrun = url.searchParams.get("dryrun");
  const debug = url.searchParams.get("debug");

  // Logs base
  console.log("[Shopify OAuth] Incoming URL:", fullUrl);
  console.log("[Shopify OAuth] Host:", req.headers.get("host"), "→ originFromReq:", reqOrigin);
  console.log("[Shopify OAuth] redirectUri:", redirectUri);

  // Sanitiza/valida shop
  const shop = shopParam && SHOP_DOMAIN_RE.test(shopParam) ? shopParam : "";

  // 1) Diagnóstico (sin redirigir)
  if (!code && check === "1") {
    const example =
      shop
        ? `https://${shop}/admin/oauth/authorize?client_id=${encodeURIComponent(
            SHOPIFY_API_KEY
          )}&scope=${encodeURIComponent(SHOPIFY_SCOPES)}&redirect_uri=${encodeURIComponent(
            redirectUri
          )}&state=<RANDOM_STATE>`
        : "(agrega ?shop=tu-tienda.myshopify.com)";

    return jsonNoStore(200, {
      note: "Diagnóstico: esto es lo que enviaríamos a Shopify (no se redirige)",
      app_url_env: APP_URL,
      request_origin_deduced: reqOrigin,
      redirect_uri_expected: redirectUri,
      redirect_uri_must_match_allowed: `${APP_URL}/api/shopify/oauth`,
      shop_input: shopParam,
      shop_validated: shop,
      example_authorize_url: example,
      tips: [
        "Verifica que el Allowed redirection URL coincide EXACTO con redirect_uri.",
        "SHOPIFY_API_SECRET debe ser el Client secret del app.",
      ],
    });
  }

  // 2) Inicio de flujo (no hay 'code' → redirigir)
  if (!code) {
    if (!shop) {
      return jsonNoStore(400, { error: "Parámetro 'shop' inválido. Ej: tu-tienda.myshopify.com", shop: shopParam });
    }

    const oauthState = crypto.randomBytes(24).toString("base64url");

    const authorizeUrl =
      `https://${shop}/admin/oauth/authorize` +
      `?client_id=${encodeURIComponent(SHOPIFY_API_KEY)}` +
      `&scope=${encodeURIComponent(SHOPIFY_SCOPES)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(oauthState)}`;
    // Para tokens online: añade &grant_options[]=per-user

    console.log("[Shopify OAuth] authorizeUrl:", authorizeUrl);

    if (dryrun === "1") {
      return new NextResponse(authorizeUrl, {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
      });
    }

    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set("shopify_oauth_state", oauthState, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 300,
    });
    res.cookies.set("shopify_shop", shop, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 300,
    });
    return res;
  }

  // 3) Callback (hay 'code'): primero HMAC → luego state/shop
  if (!shop) {
    return jsonNoStore(400, { error: "Shop inválido", shop: shopParam });
  }

  // DEBUG 2: inspección completa (sin exigir state)
  if (debug === "2") {
    const v = verifyShopifyHmac(url, SHOPIFY_API_SECRET!);
    return jsonNoStore(200, {
      note: "DEBUG2: inspección completa del callback (no se canjea el token)",
      full_url: fullUrl,
      headers: {
        host: req.headers.get("host"),
        user_agent: req.headers.get("user-agent"),
        sec_fetch_site: req.headers.get("sec-fetch-site"),
      },
      shop,
      state_param: state,
      cookies_seen: {
        stateCookie: req.cookies.get("shopify_oauth_state")?.value || "",
        shopCookie: req.cookies.get("shopify_shop")?.value || "",
      },
      hmac: {
        given: v.given_hmac,
        expected: v.digest,
        message_signed: v.message,
        match: v.ok,
      },
      redirect_uri_expected: redirectUri,
      request_origin_deduced: reqOrigin,
      timestamp_param: timestamp,
    });
  }

  // DEBUG 1: HMAC solamente (sin exigir state)
  if (debug === "1") {
    const v = verifyShopifyHmac(url, SHOPIFY_API_SECRET!);
    return jsonNoStore(200, {
      note: "DEBUG1 HMAC (sin validar state)",
      shop,
      given_hmac: v.given_hmac,
      expected_digest: v.digest,
      message: v.message,
      ok: v.ok,
      hint: "Si no coincide, revisa SHOPIFY_API_SECRET y el redirect_uri exacto en el dashboard.",
    });
  }

  // Verificación HMAC real
  const v = verifyShopifyHmac(url, SHOPIFY_API_SECRET!);
  if (!v.ok) {
    return jsonNoStore(400, {
      error: "HMAC inválido",
      hint: "Agrega ?debug=1 para ver el mensaje canónico y el digest esperado.",
    });
  }

  // Ahora valida state/shop (anti-CSRF & correlación)
  const stateCookie = req.cookies.get("shopify_oauth_state")?.value || "";
  const shopCookie = req.cookies.get("shopify_shop")?.value || "";
  if (!state || state !== stateCookie || !shopCookie || shopCookie !== shop) {
    return jsonNoStore(400, {
      error: "STATE/SHOP inválidos",
      details: { state, stateCookie, shop, shopCookie },
      hint: "Asegúrate de que el callback llega al MISMO dominio que inició el flujo (cookies).",
    });
  }

  // (Opcional) Valida frescura de timestamp si vino
  if (timestamp) {
    const nowSec = Math.floor(Date.now() / 1000);
    const ts = Number.parseInt(timestamp, 10);
    const skew = Number.parseInt(String(MAX_TIMESTAMP_SKEW_SEC), 10) || 600;
    if (Number.isFinite(ts) && Math.abs(nowSec - ts) > skew) {
      return jsonNoStore(400, {
        error: "Timestamp fuera de ventana",
        details: { nowSec, timestamp: ts, maxSkewSec: skew },
      });
    }
  }

  // Intercambio code → token
  const tokenResp = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
    cache: "no-store",
  });

  if (!tokenResp.ok) {
    const txt = await tokenResp.text();
    return jsonNoStore(400, { error: "Intercambio de token falló", details: txt });
  }

  const data = await tokenResp.json();
  const access_token: string = data.access_token;
  const scope: string = data.scope || "";
  const apiVersion = SHOPIFY_API_VERSION || "2025-07";

  if (format === "json") {
    return jsonNoStore(200, {
      ok: true,
      shop,
      api_version: apiVersion,
      access_token,
      scope,
      saved_at: new Date().toISOString(),
    });
  }

  const masked = `${access_token.slice(0, 6)}…${access_token.slice(-4)}`;
  const jsonStr = JSON.stringify(
    { access_token, scope, shop, api_version: apiVersion, saved_at: new Date().toISOString() },
    null,
    2
  );

  return htmlNoStore(
    `<!doctype html><html><body style="font-family:system-ui;padding:28px">
      <h1>✅ OAuth OK</h1>
      <p><b>Tienda:</b> ${shop}</p>
      <p><b>Versión API:</b> ${apiVersion}</p>
      <p><b>Scope:</b> ${scope}</p>
      <p><b>Access token:</b> <span style="color:#0a7f3f">${masked}</span></p>
      <p><a href="data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}" download="${shop.replace(/\./g,"_")}.json">Descargar JSON</a></p>
      <p>Para pipelines, vuelve con <code>&format=json</code>.</p>
    </body></html>`
  );
}

