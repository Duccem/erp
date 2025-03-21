'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';
import { ListProviders } from '../../modules/provider/application/list-providers';
import { PrismaProviderRepository } from '../../modules/provider/infrastructure/prisma-provider-repository';

const schema = z.object({
  filters: z
    .array(
      z.object({
        field: z.string(),
        operator: z.string(),
        value: z.any(),
      })
    )
    .optional(),
  order: z
    .object({
      field: z.string().optional(),
      order: z.string().optional(),
    })
    .optional(),
  pagination: z
    .object({
      page: z.number(),
      limit: z.number(),
    })
    .optional(),
});

export const listProviders = authActionClient
  .schema(schema)
  .metadata({ actionName: 'list-providers' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new ListProviders(new PrismaProviderRepository(database));
    return cache(
      () =>
        service.run({
          filters: parsedInput.filters as any,
          order: parsedInput.order as any,
          pagination: parsedInput.pagination as any,
        }),
      ['list-providers', user.id, organization.id],
      { tags: [`list-providers-${organization.id}-${user.id}`], revalidate: 3600 }
    )();
  });
