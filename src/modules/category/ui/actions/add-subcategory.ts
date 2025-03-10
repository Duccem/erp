'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { SaveSubCategory } from '../../application/save-sub-category';
import { PrismaCategoryRepository } from '../../infrastructure/prisma-category-repository';

const schema = z.object({
  name: z.string(),
  color: z.string(),
  categoryId: z.string(),
  id: z.string(),
});

export const saveSubCategory = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-subcategory' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new SaveSubCategory(new PrismaCategoryRepository(database));
    await service.run({
      name: parsedInput.name,
      color: parsedInput.color,
      categoryId: parsedInput.categoryId,
      subCategoryId: parsedInput.id,
    });
    revalidateTag(`list-categories-${organization.id}-${user.id}`);
    revalidatePath('/warehouse/categories');
  });
