// app/components/landing/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 🔒 Tus URLs finales de Apps Script
const APPS_SCRIPT_URL_LEADS =
  'https://script.google.com/macros/s/AKfycbxXTmOLHoXeqXdpWoOk-5mUv1nml9UnNgsE1FqcF6hXRbmnkIaaYcV3SB1JU2qnRMdE/exec';
const APPS_SCRIPT_URL_VISITORS =
  'https://script.google.com/macros/s/AKfycbxNnFwka_0ZDacvXErYNKJdaTQd_8mMtND543Eix2DSdr7Rychd5CJjBUlPBqxRiBuW/exec';

const SHARED_SECRET = '1234Jams*';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const kind = body?.kind ?? 'lead'; // por defecto tratamos como lead

    // Decide a cuál script reenviar
    const target =
      kind === 'pageview' ? APPS_SCRIPT_URL_VISITORS : APPS_SCRIPT_URL_LEADS;

    const payload = {
      ...body,
      secret: SHARED_SECRET,
      userAgent: req.headers.get('user-agent') ?? '',
      ip: (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim(),
    };

    const res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error ?? 'Sheets error' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, kind });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
