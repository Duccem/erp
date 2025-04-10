'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';
import { ListCategories } from '../../modules/category/application/list-categories';
import { PrismaCategoryRepository } from '../../modules/category/infrastructure/prisma-category-repository';

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
          organizationId: organization.id,
        }),
      ['list-categories', user.id, organization.id],
      { tags: [`list-categories-${organization.id}-${user.id}`], revalidate: 3600 }
    )();
  });
