import { NextRequest } from 'next/server';
import { betterAuthMiddleware } from './lib/auth/middleware';
const publicRoutes = ['/sign-in', '/sign-up', '/recovery-password', '/start-organization'];
export default async function middleware(req: NextRequest) {
  return betterAuthMiddleware(req, publicRoutes);
}
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(!api|trpc)(.*)'],
};
