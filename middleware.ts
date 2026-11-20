import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const rawHost =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    '';
  const host = rawHost.toLowerCase().split(':')[0];
  const { pathname } = request.nextUrl;

  if (host === 'app.oddsbots.online' || host.startsWith('app.')) {
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/app-home';
      return NextResponse.rewrite(url);
    }
  }

  if (
    host === 'mev.oddsbots.online' ||
    host === 'mev.oddsbots.com' ||
    host === 'mvp.oddsbots.online' ||
    host === 'mvp.oddsbots.com' ||
    host.startsWith('mev.') ||
    host.startsWith('mvp.')
  ) {
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/quant';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logos|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)',
  ],
};
