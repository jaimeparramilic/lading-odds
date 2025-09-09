// app/api/shopify/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // Node, no Edge (crypto estable)

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_API_VERSION,
  APP_URL: RAW_APP_URL,
} = process.env;

// Normaliza APP_URL (sin barra final) para evitar //api y mismatches
const APP_URL = (RAW_APP_URL || "").replace(/\/+$/, "");

// Verificación HMAC de OAuth (doc: ordenar por clave, k=v, &; excluir hmac/signature)
function verifyHmac(url: URL, secret: string): boolean {
  const given = url.searchParams.get("hmac") || "";
  // Construimos pares k=v; si una clave viene repetida, generamos múltiples k=v (sin join con coma)
  const pairs: string[] = [];
  // Recolecta todas las claves únicas y ordénalas
  const keys = Array.from(url.searchParams.keys())
    .filter(k => k !== "hmac" && k !== "signature")
    .sort((a,b) => (a < b ? -1 : a > b ? 1 : 0));
  // Por cada clave, añadir todos sus valores (getAll) como pares "k=v"
  for (const k of keys) {
    const vs = url.searchParams.getAll(k);
    for (const v of vs) pairs.push(`${k}=${v}`);
  }
  const message = pairs.join("&");
  const digest = crypto.createHmac("sha256", secret).update(message, "utf8").digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(digest, "utf8"), Buffer.from(given, "utf8"));
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  // Validación de envs según doc
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
  const url    = new URL(req.url);
  const shop   = url.searchParams.get("shop") || req.cookies.get("shopify_shop")?.value || "";
  const code   = url.searchParams.get("code");
  const state  = url.searchParams.get("state");
  const format = url.searchParams.get("format");
  const check  = url.searchParams.get("check"); // modo diagnóstico sin redirigir
  const redirectUri = `${APP_URL}/api/shopify/oauth`; // Debe estar whitelisteado

  // --- Diagnóstico sin tocar Shopify (cero riesgo de deploys extra) ---
  if (!code && check === "1") {
    return NextResponse.json({
      note: "Diagnóstico: esto es lo que enviaríamos a Shopify",
      shop,
      app_url_env: APP_URL,
      redirect_uri: redirectUri,
      must_match_allowed_redirect: `${APP_URL}/api/shopify/oauth`,
      example_authorize_url:
        shop && shop.endsWith(".myshopify.com")
          ? `https://${shop}/admin/oauth/authorize?client_id=${encodeURIComponent(
              SHOPIFY_API_KEY
            )}&scope=${encodeURIComponent(SHOPIFY_SCOPES)}&redirect_uri=${encodeURIComponent(
              redirectUri
            )}&state=<RANDOM_STATE>`
          : "(falta ?shop=tu-tienda.myshopify.com)",
    });
  }

  // --- Inicio de flujo (sin code): redirige a Shopify ---
  if (!code) {
    if (!shop.endsWith(".myshopify.com")) {
      return NextResponse.json({ error: "Parámetro 'shop' inválido. Ej: tu-tienda.myshopify.com", shop }, { status: 400 });
    }
    const oauthState = crypto.randomBytes(24).toString("base64url");
    const authorizeUrl =
      `https://${shop}/admin/oauth/authorize` +
      `?client_id=${encodeURIComponent(SHOPIFY_API_KEY)}` +
      `&scope=${encodeURIComponent(SHOPIFY_SCOPES)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` + // debe coincidir con whitelist
      `&state=${encodeURIComponent(oauthState)}`;
    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set("shopify_oauth_state", oauthState, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 300 });
    res.cookies.set("shopify_shop", shop,                 { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 300 });
    return res;
  }

  // --- Callback (con code): valida STATE + HMAC y canjea token ---
  if (!shop.endsWith(".myshopify.com")) {
    return NextResponse.json({ error: "Shop inválido", shop }, { status: 400 });
  }
  const stateCookie = req.cookies.get("shopify_oauth_state")?.value;
  const shopCookie  = req.cookies.get("shopify_shop")?.value;
  if (!state || state !== stateCookie || !shopCookie || shopCookie !== shop) {
    return NextResponse.json({ error: "STATE/SHOP inválidos", state, stateCookie, shopCookie, shop }, { status: 400 });
  }
  if (!verifyHmac(url, SHOPIFY_API_SECRET)) {
    return NextResponse.json({ error: "HMAC inválido" }, { status: 400 });
  }

  // code -> access_token (por defecto OFFLINE)
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

  // Página mínima (enmascara token)
  const masked = `${access_token.slice(0, 6)}…${access_token.slice(-4)}`;
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

