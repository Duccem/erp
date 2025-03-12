'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';
import { FindProvider } from '../../application/find-provider';
import { PrismaProviderRepository } from '../../infrastructure/prisma-provider-repository';

const schema = z.object({
  id: z.string(),
});

export const findProvider = authActionClient
  .schema(schema)
  .metadata({ actionName: 'find-provider' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new FindProvider(new PrismaProviderRepository(database));
    return cache(
      () => service.run({ providerId: parsedInput.id }),
      ['find-provider', user.id, organization.id, parsedInput.id],
      {
        tags: [`find-provider-${organization.id}-${user.id}-${parsedInput.id}`],
        revalidate: 3600,
      }
    )();
  });
