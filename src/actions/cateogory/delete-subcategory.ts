'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { RemoveSubCategory } from '../../modules/category/application/remove-sub-category';
import { PrismaCategoryRepository } from '../../modules/category/infrastructure/prisma-category-repository';

const schema = z.object({
  categoryId: z.string(),
  subCategoryId: z.string(),
});

export const removeSubCategory = authActionClient
  .schema(schema)
  .metadata({ actionName: 'delete-subcategory' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new RemoveSubCategory(new PrismaCategoryRepository(database));
    await service.run({
      categoryId: parsedInput.categoryId,
      subCategoryId: parsedInput.subCategoryId,
    });
    revalidateTag(`list-categories-${organization.id}-${user.id}`);
    revalidateTag(`get-category-${organization.id}-${user.id}-${parsedInput.categoryId}`);
    revalidatePath(`/warehouse/categories/${parsedInput.categoryId}`);
  });
