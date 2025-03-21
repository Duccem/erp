'use server';
import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { DeleteCategory } from '../../modules/category/application/delete-category';
import { PrismaCategoryRepository } from '../../modules/category/infrastructure/prisma-category-repository';

const schema = z.object({
  categoryId: z.string(),
});

export const deleteCategory = authActionClient
  .metadata({
    actionName: 'delete-category',
  })
  .schema(schema)
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new DeleteCategory(new PrismaCategoryRepository(database));

    await service.run(parsedInput.categoryId);
    revalidatePath('/categories');
    revalidateTag(`list-categories-${organization.id}-${user.id}`);
  });
