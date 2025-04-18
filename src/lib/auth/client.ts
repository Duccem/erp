import { emailOTPClient, inferAdditionalFields, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { env } from '../env';
import { auth } from './server';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    organizationClient({
      teams: {
        enabled: true,
      },
    }),
    emailOTPClient(),
  ],
});

export const { signIn, signOut, useSession } = authClient;
