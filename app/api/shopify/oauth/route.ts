// app/api/shopify/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // Node para crypto estable

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_API_VERSION,
  APP_URL: RAW_APP_URL,
} = process.env;

// Normaliza APP_URL (quita "/" finales)
const APP_URL = (RAW_APP_URL || "").replace(/\/+$/, "");

// -------- Helpers HMAC --------
function safeEqualHex(a: string, b: string) {
  try { return crypto.timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")); }
  catch { return false; }
}

// Parámetros *locales* que NO deben entrar en la firma (no los manda Shopify)
const LOCAL_PARAMS = new Set(["hmac", "signature", "debug", "format", "check", "dryrun"]);

/** Verificación dual:
 *  A) valores decodificados (URLSearchParams) → msgA/digA
 *  B) query string cruda (sin decodificar) → msgB/digB
 *  Se acepta si cualquiera coincide; ignora LOCAL_PARAMS en ambos casos
 */
function verifyHmacDual(url: URL, secret: string) {
  const given = url.searchParams.get("hmac") || "";

  // --- A) decoded ---
  const keysA = Array.from(url.searchParams.keys())
    .filter(k => !LOCAL_PARAMS.has(k))
    .sort((a,b) => a < b ? -1 : a > b ? 1 : 0);

  const pairsA: string[] = [];
  for (const k of keysA) {
    const vs = url.searchParams.getAll(k);
    for (const v of vs) pairsA.push(`${k}=${v}`);
  }
  const msgA = pairsA.join("&");
  const digA = crypto.createHmac("sha256", secret).update(msgA, "utf8").digest("hex");
  const sameA = safeEqualHex(digA, given);

  // --- B) raw ---
  const full = url.toString();
  const rawQuery = full.includes("?") ? full.split("?", 2)[1] : "";
  const parts = rawQuery ? rawQuery.split("&").filter(Boolean) : [];

  const kvRaw: Array<{ k: string; v: string }> = [];
  for (const p of parts) {
    const eq = p.indexOf("=");
    const k = eq >= 0 ? p.slice(0, eq) : p;
    const v = eq >= 0 ? p.slice(eq + 1) : "";
    if (LOCAL_PARAMS.has(k)) continue;
    kvRaw.push({ k, v }); // NO decodificar
  }
  kvRaw.sort((a,b) => a.k < b.k ? -1 : a.k > b.k ? 1 : 0);
  const msgB = kvRaw.map(({k,v}) => `${k}=${v}`).join("&");
  const digB = crypto.createHmac("sha256", secret).update(msgB, "utf8").digest("hex");
  const sameB = safeEqualHex(digB, given);

  return {
    ok: sameA || sameB,
    given_hmac: given,
    variant: sameA ? "A" : sameB ? "B" : "none",
    decoded: { message: msgA, digest: digA, same: sameA },
    raw:     { message: msgB, digest: digB, same: sameB },
  };
}
// --------------------------------

export async function GET(req: NextRequest) {
  if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET || !SHOPIFY_SCOPES || !APP_URL) {
    return NextResponse.json(
      {
        error: "Faltan variables de entorno",
        SHOPIFY_API_KEY: !!SHOPIFY_API_KEY,
        SHOPIFY_API_SECRET: !!SHOPIFY_API_SECRET,
        SHOPIFY_SCOPES: !!SHOPIFY_SCOPES,
        APP_URL,
      },
      { status: 500 }
    );
  }

  const secure = process.env.NODE_ENV === "production";
  const fullUrl = req.url;
  const url = new URL(fullUrl);

  const shop   = url.searchParams.get("shop") || req.cookies.get("shopify_shop")?.value || "";
  const code   = url.searchParams.get("code");
  const state  = url.searchParams.get("state");
  const format = url.searchParams.get("format"); // "json" opcional
  const check  = url.searchParams.get("check");
  const dryrun = url.searchParams.get("dryrun");
  const debug  = url.searchParams.get("debug"); // "1" o "2"

  const redirectUri = `${APP_URL}/api/shopify/oauth`;

  // Log de toda request (útil para ver el callback exacto)
  console.log("[Shopify OAuth] Incoming URL:", fullUrl);

  // ---------- Diagnóstico (no redirige) ----------
  if (!code && check === "1") {
    const example =
      shop && shop.endsWith(".myshopify.com")
        ? `https://${shop}/admin/oauth/authorize?client_id=${encodeURIComponent(SHOPIFY_API_KEY)}&scope=${encodeURIComponent(SHOPIFY_SCOPES)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=<RANDOM_STATE>`
        : "(agrega ?shop=tu-tienda.myshopify.com)";
    return NextResponse.json({
      note: "Diagnóstico: esto es lo que enviaríamos a Shopify (no se redirige)",
      shop,
      app_url_env: APP_URL,
      redirect_uri: redirectUri,
      must_match_allowed_redirect: `${APP_URL}/api/shopify/oauth`,
      example_authorize_url: example,
    });
  }

  // ---------- Inicio de flujo ----------
  if (!code) {
    if (!shop.endsWith(".myshopify.com")) {
      return NextResponse.json({ error: "Parámetro 'shop' inválido. Ej: tu-tienda.myshopify.com", shop }, { status: 400 });
    }

    const oauthState = crypto.randomBytes(24).toString("base64url");
    const authorizeUrl =
      `https://${shop}/admin/oauth/authorize` +
      `?client_id=${encodeURIComponent(SHOPIFY_API_KEY)}` +
      `&scope=${encodeURIComponent(SHOPIFY_SCOPES)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(oauthState)}`;

    console.log("[Shopify OAuth] redirectUri:", redirectUri);
    console.log("[Shopify OAuth] authorizeUrl:", authorizeUrl);

    if (dryrun === "1") {
      return new NextResponse(authorizeUrl, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }

    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set("shopify_oauth_state", oauthState, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 300 });
    res.cookies.set("shopify_shop", shop,                 { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 300 });
    return res;
  }

  // ---------- Callback ----------
  if (!shop.endsWith(".myshopify.com")) {
    return NextResponse.json({ error: "Shop inválido", shop }, { status: 400 });
  }

  const stateCookie = req.cookies.get("shopify_oauth_state")?.value || "";
  const shopCookie  = req.cookies.get("shopify_shop")?.value || "";

  // Debug profundo antes de validar state/HMAC (para inspección)
  if (debug === "2") {
    const vd = verifyHmacDual(url, SHOPIFY_API_SECRET);
    return NextResponse.json({
      note: "DEBUG2: inspección completa del callback",
      full_url: fullUrl,
      headers: {
        host: req.headers.get("host"),
        user_agent: req.headers.get("user-agent"),
        sec_fetch_site: req.headers.get("sec-fetch-site"),
      },
      shop,
      state_param: state,
      cookies: { stateCookie, shopCookie },
      hmac: {
        given: vd.given_hmac,
        matched_variant: vd.variant,  // "A" | "B" | "none"
        variant_A: vd.decoded,        // { message, digest, same }
        variant_B: vd.raw,            // { message, digest, same }
      },
      redirect_uri_expected: redirectUri,
    });
  }

  // State y shop deben coincidir
  if (!state || state !== stateCookie || !shopCookie || shopCookie !== shop) {
    return NextResponse.json({ error: "STATE/SHOP inválidos", state, stateCookie, shopCookie, shop }, { status: 400 });
  }

  // Debug simple de HMAC (sin canjear token)
  if (debug === "1") {
    const vd = verifyHmacDual(url, SHOPIFY_API_SECRET);
    return NextResponse.json({
      note: "DEBUG1 HMAC",
      shop,
      given_hmac: vd.given_hmac,
      matched_variant: vd.variant,
      variant_A: vd.decoded,
      variant_B: vd.raw,
    });
  }

  // Verificar HMAC
  const vd = verifyHmacDual(url, SHOPIFY_API_SECRET);
  if (!vd.ok) {
    return NextResponse.json({ error: "HMAC inválido" }, { status: 400 });
  }

  // Intercambio code → token (offline por defecto)
  const tokenResp = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ client_id: SHOPIFY_API_KEY, client_secret: SHOPIFY_API_SECRET, code }),
    cache: "no-store",
  });

  if (!tokenResp.ok) {
    const txt = await tokenResp.text();
    return NextResponse.json({ error: "Intercambio de token falló", details: txt }, { status: 400 });
  }

  const data = await tokenResp.json();
  const access_token: string = data.access_token;
  const scope: string = data.scope || "";
  const apiVersion = SHOPIFY_API_VERSION || "2025-07";

  // Para pipelines: JSON directo
  if (format === "json") {
    return NextResponse.json({
      ok: true,
      shop,
      api_version: apiVersion,
      access_token,
      scope,
      saved_at: new Date().toISOString(),
    });
  }

  // Página mínima (token enmascarado)
  const masked = `${access_token.slice(0,6)}…${access_token.slice(-4)}`;
  const jsonStr = JSON.stringify({ access_token, scope, shop, api_version: apiVersion, saved_at: new Date().toISOString() }, null, 2);

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
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
