'use server';

import { authActionClient } from '@/lib/actions';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { SaveWarehouse } from '../../application/save-warehouse';
import { DrizzleWarehouseRepository } from '../../infrastructure/drizzle-warehouse-repository';

const schema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
});

export const saveWarehouse = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-warehouse' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new SaveWarehouse(new DrizzleWarehouseRepository());
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
