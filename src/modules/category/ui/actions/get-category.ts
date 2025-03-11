'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';
import { GetCategory } from '../../application/get-category';
import { PrismaCategoryRepository } from '../../infrastructure/prisma-category-repository';

const schema = z.object({
  id: z.string(),
});

export const getCategory = authActionClient
  .schema(schema)
  .metadata({ actionName: 'get-category' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new GetCategory(new PrismaCategoryRepository(database));
    return cache(
      () => service.run({ categoryId: parsedInput.id }),
      ['get-category', user.id, organization.id, parsedInput.id],
      {
        tags: [`get-category-${organization.id}-${user.id}-${parsedInput.id}`],
        revalidate: 3600,
      }
    )();
  });
