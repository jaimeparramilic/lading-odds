// /app/api/shopify/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
export const runtime = 'nodejs';

const SECRET = (process.env.SHOPIFY_API_SECRET || '').replace(/\r?\n/g, '').trim();

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const raw = await req.text(); // ¡RAW body!
  const hmac = req.headers.get('x-shopify-hmac-sha256') || '';
  const topic = req.headers.get('x-shopify-topic') || '';
  const shop  = req.headers.get('x-shopify-shop-domain') || '';

  // Calcula HMAC base64
  const digest = crypto.createHmac('sha256', SECRET).update(raw, 'utf8').digest();
  const given  = Buffer.from(hmac, 'base64');

  if (!safeEqual(digest, given)) {
    return NextResponse.json({ ok: false, error: 'HMAC inválido' }, { status: 401 });
  }

  // Body ya verificado → parsea
  let payload: any = {};
  try { payload = JSON.parse(raw); } catch {}

  // Router por tópico
  switch (topic.toLowerCase()) {
    case 'app/uninstalled':
      // TODO: borra token de esa tienda en tu storage
      console.log('[webhook] app/uninstalled', shop);
      break;
    // case 'orders/create':
    //   // tu lógica
    //   break;
    default:
      console.log('[webhook] topic', topic, 'shop', shop);
  }

  // Shopify espera 200 rápido
  return NextResponse.json({ ok: true });
}
