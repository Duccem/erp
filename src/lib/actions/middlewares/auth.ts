'use server';

import { auth, getSession } from '@/lib/auth/server';
import { AuthorizationError } from '@/lib/ddd/core/errors/authorization-error';
import { createMiddleware } from 'next-safe-action';
import { headers } from 'next/headers';

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await getSession();
  if (!session?.user) {
    throw new AuthorizationError('Unauthorized');
  }
  const organization = await auth.api.listOrganizations({
    headers: await headers(),
  });
  return next({
    ctx: {
      user: session?.user,
      organization: organization[0],
    },
  });
});
