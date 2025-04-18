import { env } from '@/lib/env';
import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { bearer, emailOTP, organization } from 'better-auth/plugins';
import { headers } from 'next/headers';
import { cache } from 'react';
const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  advanced: {
    generateId: false,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        default: 'ADMIN',
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    nextCookies(),
    bearer(),
    organization({
      teams: {
        enabled: true,
      },
    }),
    emailOTP({
      otpLength: 6,
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        console.log(`Email: ${email}, OTP: ${otp}, in ${type}`);
      },
    }),
  ],
});

export type BetterSession = typeof auth.$Infer.Session;
export type BetterUser = typeof auth.$Infer.Session.user;
export const getSession: () => Promise<BetterSession | null> = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
