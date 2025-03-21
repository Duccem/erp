'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { DeleteProvider } from '../../modules/provider/application/delete-provider';
import { PrismaProviderRepository } from '../../modules/provider/infrastructure/prisma-provider-repository';

const schema = z.object({
  id: z.string(),
});

export const deleteProvider = authActionClient
  .schema(schema)
  .metadata({ actionName: 'delete-provider' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new DeleteProvider(new PrismaProviderRepository(database));
    await service.run({ providerId: parsedInput.id });
    revalidateTag(`list-providers-${organization.id}-${user.id}`);
    revalidatePath('/providers');
  });
