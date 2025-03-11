'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { DeleteWarehouse } from '../../application/delete-warehouse';
import { PrismaWarehouseRepository } from '../../infrastructure/prisma-warehouse-repository';

const schema = z.object({
  id: z.string(),
});

export const deleteWarehouse = authActionClient
  .schema(schema)
  .metadata({ actionName: 'delete-warehouse' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new DeleteWarehouse(new PrismaWarehouseRepository(database));
    await service.run({ warehouseId: parsedInput.id });
    revalidateTag(`list-warehouses-${organization.id}-${user.id}`);
    revalidatePath('/warehouse');
  });
