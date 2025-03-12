'use server';

import { authActionClient } from '@/lib/actions';
import { database } from '@/lib/database';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { SaveProvider } from '../../application/save-provider';
import { PrismaProviderRepository } from '../../infrastructure/prisma-provider-repository';

const schema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  image: z.string(),
});

export const saveProvider = authActionClient
  .schema(schema)
  .metadata({ actionName: 'save-provider' })
  .action(async ({ parsedInput, ctx: { user, organization } }) => {
    const service = new SaveProvider(new PrismaProviderRepository(database));
    await service.run({
      id: parsedInput.id,
      name: parsedInput.name,
      description: parsedInput.description,
      type: parsedInput.type,
      status: parsedInput.status,
      phone: parsedInput.phone,
      email: parsedInput.email,
      address: parsedInput.address,
      image: parsedInput.image,
    });
    revalidateTag(`list-providers-${organization.id}-${user.id}`);
    revalidatePath('/providers');
    revalidatePath(`/providers/${parsedInput.id}`);
  });
