import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';
export async function betterAuthMiddleware(req: NextRequest, response: NextResponse, publicRoutes: string[]) {
  if (req.nextUrl.pathname.startsWith('/api')) {
    return response;
  }
  const session = getSessionCookie(req);
  if (!session && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (session && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return response;
}
