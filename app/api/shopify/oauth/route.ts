// /app/api/shopify/oauth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { shopify } from '@/lib/shopify';

export const runtime = 'nodejs';

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: RAW_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_API_VERSION,
  APP_URL: RAW_APP_URL,
} = process.env;

const APP_URL = (RAW_APP_URL || '').replace(/\/+$/, '');
const SECRET = (RAW_SECRET || '').replace(/\r?\n/g, '').trim();

const LOCAL_FLAGS = new Set(['hmac','signature','debug','check','dryrun','format']);

function json(status: number, body: any) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}
function validShop(s?: string | null) {
  return !!s && /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(s);
}

// Construcción canónica del mensaje HMAC (para inspección en debug=2)
function canonicalMessage(url: URL) {
  const keys = Array.from(new Set(Array.from(url.searchParams.keys())))
    .filter(k => !LOCAL_FLAGS.has(k))
    .sort((a,b) => a.localeCompare(b));
  const parts: string[] = [];
  for (const k of keys) {
    const vs = url.searchParams.getAll(k).sort((a,b)=>a.localeCompare(b));
    for (const v of vs) parts.push(`${k}=${v}`);
  }
  return parts.join('&');
}
function safeEqHex(aHex: string, bHex: string) {
  const a = Buffer.from((aHex||'').toLowerCase(), 'hex');
  const b = Buffer.from((bHex||'').toLowerCase(), 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a,b);
}

export async function GET(req: NextRequest) {
  // sanity env
  if (!SHOPIFY_API_KEY || !SECRET || !SHOPIFY_SCOPES || !APP_URL) {
    return json(500, {
      error: 'Faltan variables de entorno',
      SHOPIFY_API_KEY: !!SHOPIFY_API_KEY,
      SHOPIFY_API_SECRET: !!SECRET,
      SHOPIFY_SCOPES: !!SHOPIFY_SCOPES,
      APP_URL,
    });
  }

  const url = new URL(req.url);
  const shop = url.searchParams.get('shop') || req.cookies.get('shopify_shop')?.value || '';
  const code = url.searchParams.get('code');
  const check = url.searchParams.get('check');
  const dryrun = url.searchParams.get('dryrun');
  const debug = url.searchParams.get('debug');
  const format = url.searchParams.get('format');

  // IMPORTANTE: la ruta pública del callback es /api/... (no /app/api/...)
  const redirectUri = `${APP_URL}/api/shopify/oauth`;

  // --- Sanity (no redirige) ---
  if (!code && check === '1') {
    const shop_validated = validShop(shop) ? shop : '';
    const example = shop_validated
      ? `https://${shop_validated}/admin/oauth/authorize?client_id=${encodeURIComponent(SHOPIFY_API_KEY!)}&scope=${encodeURIComponent(SHOPIFY_SCOPES!)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=<RANDOM_STATE>`
      : '(agrega ?shop=tu-tienda.myshopify.com)';

    return json(200, {
      note: 'Diagnóstico: esto es lo que enviaríamos a Shopify (no se redirige)',
      app_url_env: APP_URL,
      request_origin_deduced: `https://${req.headers.get('host')}`,
      redirect_uri_expected: redirectUri,
      redirect_uri_must_match_allowed: redirectUri,
      shop_input: shop,
      shop_validated,
      example_authorize_url: example,
      tips: [
        'Allowed redirection URL debe coincidir EXACTO con redirect_uri',
        'SHOPIFY_API_SECRET = Client secret del app',
      ],
    });
  }

  // --- Inicio OAuth (sin code): MANUAL (evita 500 del auth.begin) ---
  if (!code) {
    if (!validShop(shop)) {
      return json(400, { error: "Parámetro 'shop' inválido. Ej: tu-tienda.myshopify.com", shop });
    }

    // Dry run: solo imprime la URL de autorización (no redirige)
    if (dryrun === '1') {
      const state = crypto.randomBytes(24).toString('base64url');
      const authorizeUrl =
        `https://${shop}/admin/oauth/authorize` +
        `?client_id=${encodeURIComponent(SHOPIFY_API_KEY!)}` +
        `&scope=${encodeURIComponent(SHOPIFY_SCOPES!)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${encodeURIComponent(state)}`;
      return new NextResponse(authorizeUrl, {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }

    // Redirect real + cookies de state/shop
    const oauthState = crypto.randomBytes(24).toString('base64url');
    const authorizeUrl =
      `https://${shop}/admin/oauth/authorize` +
      `?client_id=${encodeURIComponent(SHOPIFY_API_KEY!)}` +
      `&scope=${encodeURIComponent(SHOPIFY_SCOPES!)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(oauthState)}`;

    const SECURE_COOKIE = process.env.NODE_ENV === 'production';
    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set('shopify_oauth_state', oauthState, { httpOnly: true, secure: SECURE_COOKIE, sameSite: 'lax', path: '/', maxAge: 300 });
    res.cookies.set('shopify_shop', shop!,                 { httpOnly: true, secure: SECURE_COOKIE, sameSite: 'lax', path: '/', maxAge: 300 });
    return res;
  }

  // --- Debug HMAC del callback (sin canjear token) ---
  if (debug === '2') {
    const given = url.searchParams.get('hmac') || '';
    const message = canonicalMessage(url);
    const digest = crypto.createHmac('sha256', SECRET).update(message, 'utf8').digest('hex');
    return json(200, {
      note: 'DEBUG2: inspección del callback (no se canjea el token)',
      full_url: req.url,
      shop,
      hmac: { given, expected: digest, message_signed: message, match: safeEqHex(digest, given) },
      redirect_uri_expected: redirectUri,
    });
  }

  // --- Callback: valida HMAC/STATE y canjea token con la librería ---
  try {
    const { session, shop: confirmedShop } = await (shopify.auth as any).callback({
      isOnline: false,
      request: req, // Next App Router Request (adapter Web API)
    });

    const access_token = (session as any).accessToken as string;
    const scope = session.scope || '';
    const apiVersion = SHOPIFY_API_VERSION || '2025-07';

    if (format === 'json') {
      return json(200, {
        ok: true,
        shop: confirmedShop,
        api_version: apiVersion,
        access_token,
        scope,
        saved_at: new Date().toISOString(),
      });
    }

    const masked = `${access_token.slice(0,6)}…${access_token.slice(-4)}`;
    const jsonStr = JSON.stringify({ access_token, scope, shop: confirmedShop, api_version: apiVersion, saved_at: new Date().toISOString() }, null, 2);

    return new NextResponse(
      `<!doctype html><html><body style="font-family:system-ui;padding:28px">
        <h1>✅ OAuth OK</h1>
        <p><b>Tienda:</b> ${confirmedShop}</p>
        <p><b>Versión API:</b> ${apiVersion}</p>
        <p><b>Scope:</b> ${scope}</p>
        <p><b>Access token:</b> <span style="color:#0a7f3f">${masked}</span></p>
        <p><a href="data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}" download="${confirmedShop.replace(/\./g,'_')}.json">Descargar JSON</a></p>
        <p>Para pipelines, vuelve con <code>&format=json</code>.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
    );
  } catch (err: any) {
    return json(400, { error: 'OAuth callback falló', details: String(err) });
  }
}
