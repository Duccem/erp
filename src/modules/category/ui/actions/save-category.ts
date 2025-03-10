'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { SaveCategory } from '../../application/save-category';
import { PrismaCategoryRepository } from '../../infrastructure/prisma-category-repository';

const schema = z.object({
  name: z.string(),
  color: z.string(),
  id: z.string(),
});

export const saveCategory = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-category' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new SaveCategory(new PrismaCategoryRepository(database));
    await service.run({
      id: parsedInput.id,
      name: parsedInput.name,
      color: parsedInput.color,
      organizationId: organization.id,
    });
    revalidateTag(`list-categories-${organization.id}-${user.id}`);
    revalidatePath('/warehouse/categories');
  });
