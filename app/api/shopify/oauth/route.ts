// app/api/shopify/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // usa Node (no edge) para crypto estable

const {
  SHOPIFY_API_KEY,
  SHOPIFY_SCOPES,
  APP_URL,
} = process.env;

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get("shop"); // ej: kueh0y-ib.myshopify.com
  if (!shop || !shop.endsWith(".myshopify.com")) {
    return new NextResponse("Parámetro 'shop' inválido", { status: 400 });
  }
  if (!SHOPIFY_API_KEY || !SHOPIFY_SCOPES || !APP_URL) {
    return new NextResponse("Faltan variables de entorno", { status: 500 });
  }

  // CSRF state
  const state = crypto.randomBytes(24).toString("base64url");

  const redirectUri = `${APP_URL}/api/shopify/callback`;
  const authorizeUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${encodeURIComponent(SHOPIFY_API_KEY)}` +
    `&scope=${encodeURIComponent(SHOPIFY_SCOPES)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${encodeURIComponent(state)}`;

  const res = NextResponse.redirect(authorizeUrl);
  // cookies httpOnly para validar en callback
  res.cookies.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 300, // 5 min
  });
  res.cookies.set("shopify_shop", shop, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 300,
  });

  return res;
}
