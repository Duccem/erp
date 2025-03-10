'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';
import { ListCategories } from '../../application/list-categories';
import { PrismaCategoryRepository } from '../../infrastructure/prisma-category-repository';

const schema = z.object({
  filters: z.array(
    z.object({
      field: z.string(),
      operator: z.string(),
      value: z.any(),
    })
  ),
  order: z.object({
    field: z.string(),
    order: z.enum(['ASC', 'DESC']),
  }),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
  }),
});

export const listCategories = authActionClient
  .schema(schema)
  .metadata({ actionName: 'list-categories' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new ListCategories(new PrismaCategoryRepository(database));
    return cache(
      () =>
        service.run({
          filters: parsedInput.filters as any,
          order: parsedInput.order as any,
          pagination: parsedInput.pagination as any,
        }),
      ['list-categories', user.id, organization.id],
      { tags: [`list-categories-${organization.id}-${user.id}`], revalidate: 3600 }
    )();
  });
