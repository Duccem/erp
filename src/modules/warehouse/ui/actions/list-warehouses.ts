'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { unstable_cache as cache } from 'next/cache';
import { z } from 'zod';
import { ListWarehouses } from '../../application/list-warehouses';
import { PrismaWarehouseRepository } from '../../infrastructure/prisma-warehouse-repository';

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

export const listWarehouses = authActionClient
  .schema(schema)
  .metadata({ actionName: 'list-warehouses' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new ListWarehouses(new PrismaWarehouseRepository(database));
    return cache(
      () =>
        service.run({
          filters: parsedInput.filters as any,
          order: parsedInput.order as any,
          pagination: parsedInput.pagination as any,
          organizationId: organization.id,
        }),
      ['list-warehouses', user.id, organization.id],
      { tags: [`list-warehouses-${organization.id}-${user.id}`], revalidate: 3600 }
    )();
  });
