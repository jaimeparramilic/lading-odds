// app/api/shopify/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // Node (no Edge) para crypto estable

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_API_VERSION,
  APP_URL: RAW_APP_URL,
} = process.env;

// Normaliza APP_URL quitando barras finales (evita //api y mismatches)
const APP_URL = (RAW_APP_URL || "").replace(/\/+$/, "");

// Verificación HMAC de OAuth (excluir hmac/signature, ordenar por clave, pares k=v unidos con &)
// Si una clave aparece varias veces, se generan múltiples "k=v" (no se juntan con coma).
function verifyHmac(url: URL, secret: string) {
  const given = url.searchParams.get("hmac") || "";
  const keys = Array.from(url.searchParams.keys())
    .filter((k) => k !== "hmac" && k !== "signature")
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  const pairs: string[] = [];
  for (const k of keys) {
    const values = url.searchParams.getAll(k);
    for (const v of values) pairs.push(`${k}=${v}`);
  }

  const message = pairs.join("&");
  const digest = crypto.createHmac("sha256", secret).update(message, "utf8").digest("hex");

  let same = false;
  try {
    same = crypto.timingSafeEqual(Buffer.from(digest, "utf8"), Buffer.from(given, "utf8"));
  } catch {
    same = false;
  }
  return { same, message, given, digest };
}

export async function GET(req: NextRequest) {
  // Validación de envs
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
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop") || req.cookies.get("shopify_shop")?.value || "";
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const format = url.searchParams.get("format"); // "json" opcional
  const check = url.searchParams.get("check");   // "1" → diagnóstico (no redirige)
  const dryrun = url.searchParams.get("dryrun"); // "1" → imprime authorizeUrl (no redirige)
  const debug = url.searchParams.get("debug") === "1"; // en callback: muestra firma/HMACs

  const redirectUri = `${APP_URL}/api/shopify/oauth`; // Debe estar en Allowed redirection URL(s)

  // --- Diagnóstico sin tocar Shopify (NO redirige) ---
  if (!code && check === "1") {
    const example =
      shop && shop.endsWith(".myshopify.com")
        ? `https://${shop}/admin/oauth/authorize?client_id=${encodeURIComponent(
            SHOPIFY_API_KEY
          )}&scope=${encodeURIComponent(SHOPIFY_SCOPES)}&redirect_uri=${encodeURIComponent(
            redirectUri
          )}&state=<RANDOM_STATE>`
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

  // --- Inicio del flujo (sin code): redirige a Shopify ---
  if (!code) {
    if (!shop.endsWith(".myshopify.com")) {
      return NextResponse.json(
        { error: "Parámetro 'shop' inválido. Ej: tu-tienda.myshopify.com", shop },
        { status: 400 }
      );
    }

    const oauthState = crypto.randomBytes(24).toString("base64url");
    const authorizeUrl =
      `https://${shop}/admin/oauth/authorize` +
      `?client_id=${encodeURIComponent(SHOPIFY_API_KEY)}` +
      `&scope=${encodeURIComponent(SHOPIFY_SCOPES)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(oauthState)}`;

    // Logs en Vercel
    console.log("[Shopify OAuth] redirectUri:", redirectUri);
    console.log("[Shopify OAuth] authorizeUrl:", authorizeUrl);

    // Modo dryrun: devuelve authorizeUrl en texto (NO redirige)
    if (dryrun === "1") {
      return new NextResponse(authorizeUrl, {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set("shopify_oauth_state", oauthState, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 300, // 5 min
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

  // --- Callback (con code): valida STATE + HMAC y canjea token ---
  if (!shop.endsWith(".myshopify.com")) {
    return NextResponse.json({ error: "Shop inválido", shop }, { status: 400 });
  }

  const stateCookie = req.cookies.get("shopify_oauth_state")?.value;
  const shopCookie = req.cookies.get("shopify_shop")?.value;

  if (!state || state !== stateCookie || !shopCookie || shopCookie !== shop) {
    return NextResponse.json(
      { error: "STATE/SHOP inválidos", state, stateCookie, shopCookie, shop },
      { status: 400 }
    );
  }

  const { same, message, given, digest } = verifyHmac(url, SHOPIFY_API_SECRET);
  if (debug) {
    // Modo debug: muestra exactamente qué firmamos y ambos HMACs (no canjea token)
    return NextResponse.json({
      note: "DEBUG HMAC (no dejes esto activado en prod pública)",
      shop,
      message,          // string canónico que firmamos
      given_hmac: given,
      calculated_hmac: digest,
      same,
    });
  }

  if (!same) {
    return NextResponse.json({ error: "HMAC inválido" }, { status: 400 });
  }

  // Intercambio code → access_token (por defecto OFFLINE; no pasamos grant_options[]=per-user)
  const tokenResp = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
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

  // JSON para pipelines
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
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}


