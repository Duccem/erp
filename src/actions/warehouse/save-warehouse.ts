'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { SaveWarehouse } from '../../modules/warehouse/application/save-warehouse';
import { PrismaWarehouseRepository } from '../../modules/warehouse/infrastructure/prisma-warehouse-repository';

const schema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
});

export const saveWarehouse = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-warehouse' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new SaveWarehouse(new PrismaWarehouseRepository(database));
    await service.run({
      id: parsedInput.id,
      name: parsedInput.name,
      address: parsedInput.address,
      organizationId: organization.id,
    });
    revalidateTag(`list-warehouses-${organization.id}-${user.id}`);
    revalidatePath('/warehouse');
    revalidatePath(`/warehouse/${parsedInput.id}`);
  });
