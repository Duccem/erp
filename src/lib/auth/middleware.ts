import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';
export async function betterAuthMiddleware(req: NextRequest, publicRoutes: string[]) {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  const session = getSessionCookie(req);
  if (!session && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (session && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
