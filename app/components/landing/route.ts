// app/components/landing/route.ts
import { NextRequest, NextResponse } from 'next/server';

// WebApps de Google Apps Script
const APPS_SCRIPT_URL_LEADS =
  'https://script.google.com/macros/s/AKfycbxXTmOLHoXeqXdpWoOk-5mUv1nml9UnNgsE1FqcF6hXRbmnkIaaYcV3SB1JU2qnRMdE/exec';
const APPS_SCRIPT_URL_VISITORS =
  'https://script.google.com/macros/s/AKfycbzhQR4aGj0GLmYRxriwBmrU8iRiob8T7Sqti9lQzkFJnmaLeBfD2SwAUG1_gamfAdvx/exec';

const SHARED_SECRET = '1234Jams*';
const VISITOR_KINDS = new Set(['pageview', 'event', 'webvitals']);

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1) Body robusto (JSON preferido; fallback urlencoded)
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      const raw = await req.text();
      body =
        (raw && safeParseJSON(raw)) ||
        (raw ? Object.fromEntries(new URLSearchParams(raw) as any) : {});
    }

    // 2) Enrutamiento según tipo
    const kind: string = body?.kind ?? 'lead';
    const target = VISITOR_KINDS.has(kind)
      ? APPS_SCRIPT_URL_VISITORS
      : APPS_SCRIPT_URL_LEADS;

    // 3) Enriquecer y enviar
    const payload = {
      ...body,
      secret: SHARED_SECRET,
      userAgent: req.headers.get('user-agent') ?? '',
      ip: (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim(),
    };

    const upstream = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    let data: any = null;
    try {
      data = await upstream.json();
    } catch {
      const text = await upstream.text();
      data = safeParseJSON(text) ?? { ok: upstream.ok };
    }

    if (!upstream.ok || data?.ok === false) {
      return NextResponse.json(
        { ok: false, error: data?.error ?? `Upstream error (${upstream.status})` },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, kind });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}

function safeParseJSON(s: string) {
  try { return JSON.parse(s); } catch { return null; }
}
