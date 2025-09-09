// app/api/shopify/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // usar Node (crypto estable)

// ========= ENV & CONSTANTES =========
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: RAW_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_API_VERSION,
  APP_URL: RAW_APP_URL,
} = process.env;

// Normaliza APP_URL (sin slash final) y SECRET (sin \n ni espacios invisibles)
const APP_URL = (RAW_APP_URL || "").replace(/\/+$/, "");
const SECRET = (RAW_SECRET || "").replace(/\r?\n/g, "").trim();

const SECURE_COOKIE = process.env.NODE_ENV === "production";

// flags locales nunca entran a la firma
const LOCAL_FLAGS = new Set(["hmac", "signature", "debug", "check", "dryrun", "format"]);

// ========= HELPERS =========
function json(status: number, body: any) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function timingSafeHexEqual(a: string, b: string) {
  try { return crypto.timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")); }
  catch { return false; }
}

/** Construye el mensaje canónico EXACTO para HMAC (OAuth):
 *  - quitar hmac
 *  - ordenar por clave (string ascendente)
 *  - incluir entradas repetidas en el orden de valores
 *  - concatenar "k=v" con "&"
 *  Referencia: guía de Authorization Code Grant / Step 1 & Step 3. */
function canonicalOAuthMessage(url: URL) {
  const params = url.searchParams;
  const keys = Array.from(new Set(Array.from(params.keys()))).filter(k => !LOCAL_FLAGS.has(k));
  keys.sort(); // orden ascendente por clave

  const pairs: string[] = [];
  for (const k of keys) {
    const vs = params.getAll(k);
    for (const v of vs) pairs.push(`${k}=${v}`); // usar valores decodificados por URLSearchParams
  }
  return pairs.join("&");
}

function verifyHmac(url: URL, secret: string) {
  const given = url.searchParams.get("hmac") || "";
  const message = canonicalOAuthMessage(url);
  const digest = crypto.createHmac("sha256", secret).update(message, "utf8").digest("hex");
  const ok = timingSafeHexEqual(digest, given);
  return { ok, given, digest, message };
}

function mustHaveEnv() {
  return !SHOPIFY_API_KEY || !SECRET || !SHOPIFY_SCOPES || !APP_URL;
}

// ========= HANDLER =========
export async function GET(req: NextRequest) {
  if (mustHaveEnv()) {
    return json(500, {
      error: "Faltan variables de entorno",
      SHOPIFY_API_KEY: !!SHOPIFY_API_KEY,
      SHOPIFY_API_SECRET: !!SECRET,
      SHOPIFY_SCOPES: !!SHOPIFY_SCOPES,
      APP_URL,
    });
  }

  const fullUrl = req.url;
  const url = new URL(fullUrl);

  const shop   = url.searchParams.get("shop") || req.cookies.get("shopify_shop")?.value || "";
  const code   = url.searchParams.get("code");
  const state  = url.searchParams.get("state");
  const format = url.searchParams.get("format"); // "json"
  const check  = url.searchParams.get("check");  // "1"
  const dryrun = url.searchParams.get("dryrun"); // "1"
  const debug  = url.searchParams.get("debug");  // "1" | "2" | "3"

  const redirectUri = `${APP_URL}/api/shopify/oauth`;
  const apiVersion = SHOPIFY_API_VERSION || "2025-07";

  // ——— DEBUG 3: fingerprint de entorno (sin exponer secretos) ———
  if (debug === "3") {
    const secretSha = crypto.createHash("sha256").update(SECRET).digest("hex");
    return json(200, {
      note: "DEBUG3: fingerprint entorno",
      app_url_env: APP_URL,
      api_key_tail: (SHOPIFY_API_KEY || "").slice(-8),
      secret_len: SECRET.length,
      secret_sha256_prefix: secretSha.slice(0, 12),
    });
  }

  // ——— SANITY CHECK (sin redirigir) ———
  if (!code && check === "1") {
    const shop_validated =
      shop && /\.myshopify\.com$/i.test(shop) ? shop : "";

    const example =
      shop_validated
        ? `https://${shop_validated}/admin/oauth/authorize?client_id=${encodeURIComponent(SHOPIFY_API_KEY!)}&scope=${encodeURIComponent(SHOPIFY_SCOPES!)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=<RANDOM_STATE>`
        : "(agrega ?shop=tu-tienda.myshopify.com)";

    return json(200, {
      note: "Diagnóstico: esto es lo que enviaríamos a Shopify (no se redirige)",
      app_url_env: APP_URL,
      request_origin_deduced: `https://${req.headers.get("host")}`,
      redirect_uri_expected: redirectUri,
      redirect_uri_must_match_allowed: `${APP_URL}/api/shopify/oauth`,
      shop_input: shop,
      shop_validated,
      example_authorize_url: example,
      tips: [
        "Verifica que el Allowed redirection URL coincide EXACTO con redirect_uri.",
        "SHOPIFY_API_SECRET debe ser el Client secret del app."
      ],
    });
  }

  // ——— INICIO: construir authorize y redirigir ———
  if (!code) {
    if (!/\.myshopify\.com$/i.test(shop)) {
      return json(400, { error: "Parámetro 'shop' inválido. Ej: tu-tienda.myshopify.com", shop });
    }

    const oauthState = crypto.randomBytes(24).toString("base64url");
    const authorizeUrl =
      `https://${shop}/admin/oauth/authorize` +
      `?client_id=${encodeURIComponent(SHOPIFY_API_KEY!)}` +
      `&scope=${encodeURIComponent(SHOPIFY_SCOPES!)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` + // Debe estar whitelisteado
      `&state=${encodeURIComponent(oauthState)}`;

    if (dryrun === "1") {
      return new NextResponse(authorizeUrl, {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }

    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set("shopify_oauth_state", oauthState, { httpOnly: true, secure: SECURE_COOKIE, sameSite: "lax", path: "/", maxAge: 300 });
    res.cookies.set("shopify_shop", shop,                 { httpOnly: true, secure: SECURE_COOKIE, sameSite: "lax", path: "/", maxAge: 300 });
    return res;
  }

  // ——— CALLBACK ———
  if (!/\.myshopify\.com$/i.test(shop)) {
    return json(400, { error: "Shop inválido", shop });
  }

  const stateCookie = req.cookies.get("shopify_oauth_state")?.value || "";
  const shopCookie  = req.cookies.get("shopify_shop")?.value || "";

  // ——— DEBUG 2: inspección completa del callback (no canjea token) ———
  if (debug === "2") {
    const v = verifyHmac(url, SECRET);
    return json(200, {
      note: "DEBUG2: inspección completa del callback (no se canjea el token)",
      full_url: fullUrl,
      headers: {
        host: req.headers.get("host"),
        user_agent: req.headers.get("user-agent"),
        sec_fetch_site: req.headers.get("sec-fetch-site"),
      },
      shop,
      state_param: state,
      cookies_seen: { stateCookie, shopCookie },
      hmac: {
        given: v.given,
        expected: v.digest,
        message_signed: v.message,
        match: v.ok,
      },
      redirect_uri_expected: redirectUri,
      request_origin_deduced: `https://${req.headers.get("host")}`,
      timestamp_param: url.searchParams.get("timestamp"),
    });
  }

  // CSRF: valida state & shop persistidos
  if (!state || state !== stateCookie || !shopCookie || shopCookie !== shop) {
    return json(400, { error: "STATE/SHOP inválidos", state, stateCookie, shopCookie, shop });
  }

  // ——— DEBUG 1: ver firma HMAC (sin canjear token) ———
  if (debug === "1") {
    const v = verifyHmac(url, SECRET);
    return json(200, {
      note: "DEBUG1 HMAC",
      given: v.given,
      expected: v.digest,
      message_signed: v.message,
      match: v.ok,
    });
  }

  // Verifica HMAC (OAuth) exactamente como doc
  const v = verifyHmac(url, SECRET);
  if (!v.ok) {
    return json(400, {
      error: "HMAC inválido",
      hint: "Agrega ?debug=2 al callback para ver message/expected/given.",
    });
  }

  // Intercambio code → access_token (offline por defecto)
  const tokenResp = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ client_id: SHOPIFY_API_KEY, client_secret: SECRET, code }),
    cache: "no-store",
  });

  if (!tokenResp.ok) {
    const txt = await tokenResp.text();
    return json(400, { error: "Intercambio de token falló", details: txt });
  }

  const tokenData = await tokenResp.json();
  const access_token: string = tokenData.access_token;
  const scope: string = tokenData.scope || "";

  if (format === "json") {
    return json(200, {
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

  return new NextResponse(
    `<!doctype html><html><body style="font-family:system-ui;padding:28px">
      <h1>✅ OAuth OK</h1>
      <p><b>Tienda:</b> ${shop}</p>
      <p><b>Versión API:</b> ${apiVersion}</p>
      <p><b>Scope:</b> ${scope}</p>
      <p><b>Access token:</b> <span style="color:#0a7f3f">${masked}</span></p>
      <p><a href="data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}" download="${shop.replace(/\./g,"_")}.json">Descargar JSON</a></p>
      <p>Para pipelines, vuelve con <code>&format=json</code>.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
  );
}
