'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function uuid() {
  if ('randomUUID' in crypto) return (crypto as any).randomUUID();
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function parseUTMs(search: URLSearchParams) {
  const fields = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
    'msclkid',
    'ttclid',
  ];
  const out: Record<string, string> = {};
  fields.forEach((f) => {
    const val = search.get(f);
    if (val) out[f] = val;
  });
  return out;
}

export default function Analytics() {
  const pathname = usePathname();
  const search = useSearchParams();
  const sentRef = useRef<string | null>(null);

  useEffect(() => {
    // evita correr en SSR
    if (typeof window === 'undefined') return;

    // Sesión ligera en localStorage (no bloquea render)
    const sid =
      localStorage.getItem('odds_sid') ||
      (() => {
        const id = uuid();
        localStorage.setItem('odds_sid', id);
        return id;
      })();

    const utms = parseUTMs(search);
    const referrer = document.referrer || '';
    const page = `${pathname}${search?.toString() ? `?${search.toString()}` : ''}`;
    const lang = navigator.language || '';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const vp = { w: window.innerWidth, h: window.innerHeight };

    const payload = {
      kind: 'pageview',
      ts: new Date().toISOString(),
      sid,
      page,
      pathname,
      referrer,
      utms,
      lang,
      tz,
      vp,
      source: 'odds.la/analytics',
    };

    // Evita duplicados si hay re-render
    const key = JSON.stringify({ sid, page });
    if (sentRef.current === key) return;
    sentRef.current = key;

    // Enviar en background (no bloquea render)
    fetch('/components/landing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // opcional: intentar nuevamente después de un tick
      setTimeout(() => {
        fetch('/components/landing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }, 250);
    });
  }, [pathname, search]);

  return null;
}
