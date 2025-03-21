'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';
import { FindWarehouse } from '../../modules/warehouse/application/find-warehouse';
import { PrismaWarehouseRepository } from '../../modules/warehouse/infrastructure/prisma-warehouse-repository';

const schema = z.object({
  id: z.string(),
});

export const findWarehouse = authActionClient
  .schema(schema)
  .metadata({ actionName: 'find-warehouse' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new FindWarehouse(new PrismaWarehouseRepository(database));
    return cache(
      () => service.run({ warehouseId: parsedInput.id }),
      ['find-warehouse', user.id, organization.id, parsedInput.id],
      {
        tags: [`find-warehouse-${organization.id}-${user.id}-${parsedInput.id}`],
        revalidate: 3600,
      }
    )();
  });
