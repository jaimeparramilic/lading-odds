// /app/api/shopify/admin/ping/route.ts
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
    const resp = await client.get({ path: 'shop.json' });
    return NextResponse.json({ ok: true, data: resp }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e: any) {
    return NextResponse.json({ error: 'Admin API failed', details: String(e) }, { status: 500 });
  }
}
