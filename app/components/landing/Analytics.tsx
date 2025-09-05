'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function uuid() {
  if ('randomUUID' in crypto) return (crypto as any).randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function parseUTMs(search: URLSearchParams) {
  const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','msclkid','ttclid'];
  const out: Record<string, string> = {};
  keys.forEach(k => { const v = search.get(k); if (v) out[k] = v; });
  return out;
}
function deviceCategory(vw: number, uaMobile?: boolean) {
  if (uaMobile) return 'mobile';
  if (vw >= 1024) return 'desktop';
  if (vw >= 640) return 'tablet';
  return 'mobile';
}
function parseUA(ua: string) {
  const s = ua.toLowerCase();
  const os = s.includes('windows') ? 'Windows'
    : s.includes('mac os') || s.includes('macintosh') ? 'macOS'
    : s.includes('android') ? 'Android'
    : s.includes('iphone') || s.includes('ipad') ? 'iOS'
    : s.includes('linux') ? 'Linux' : 'Other';
  const browser = s.includes('edg/') ? 'Edge'
    : s.includes('chrome/') ? 'Chrome'
    : s.includes('safari/') && !s.includes('chrome/') ? 'Safari'
    : s.includes('firefox/') ? 'Firefox' : 'Other';
  return { os, browser };
}

export default function Analytics() {
  const pathname = usePathname();
  const search = useSearchParams();
  const sentRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ID solo para este pageview (no persistente)
    const pvId = uuid();

    const utms = parseUTMs(search);
    const referrer = document.referrer || '';
    const page = `${pathname}${search?.toString() ? `?${search.toString()}` : ''}`;

    // Contexto
    const lang = navigator.language || '';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const vp = { w: window.innerWidth, h: window.innerHeight };
    const dpr = window.devicePixelRatio || 1;
    const colorDepth = window.screen?.colorDepth ?? null;
    const orientation = (screen.orientation && screen.orientation.type) || null;
    const dnt = (navigator as any).doNotTrack || (window as any).doNotTrack || null;

    const uaData = (navigator as any).userAgentData || null;
    const uaString = navigator.userAgent || '';
    const { os, browser } = parseUA(uaString);
    const device = {
      category: deviceCategory(vp.w, uaData?.mobile),
      uaPlatform: uaData?.platform ?? null,
      uaMobile: uaData?.mobile ?? null,
      uaBrands: uaData?.brands ? JSON.stringify(uaData.brands) : null,
      os, browser,
    };

    const cores = navigator.hardwareConcurrency ?? null;
    const memoryGB = (navigator as any).deviceMemory ?? null;
    const conn = (navigator as any).connection || {};
    const net = {
      effectiveType: conn.effectiveType || null,
      downlink: conn.downlink || null,
      rtt: conn.rtt || null,
      saveData: conn.saveData || false,
    };

    const payload = {
      kind: 'pageview',
      ts: new Date().toISOString(),
      pvId,                 // ← ID efímero del pageview
      page, pathname, referrer, utms,
      lang, tz, vp, dpr, colorDepth, orientation, dnt,
      device, hw: { cores, memoryGB }, net,
      source: 'odds.la/analytics',
    };

    // Evita duplicados si React re-renderiza
    const key = JSON.stringify({ pvId, page });
    if (sentRef.current === key) return;
    sentRef.current = key;

    fetch('/components/landing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, search]);

  return null;
}
