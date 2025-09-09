// /app/api/shopify/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { restClient } from '@/lib/shopify';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const shop = url.searchParams.get('shop') || '';
  const token = url.searchParams.get('access_token') || '';

  if (!shop || !token) {
    return NextResponse.json({ error: 'Falta ?shop y/o ?access_token' }, { status: 400 });
  }

  try {
    const client = restClient(shop, token);
    const out = await client.get({ path: 'products', query: { limit: 5 } });
    return NextResponse.json(out, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e: any) {
    return NextResponse.json({ error: 'Admin API failed', details: String(e) }, { status: 500 });
  }
}
