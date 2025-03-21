import { database } from '@/lib/database';
import { env } from '@/lib/env';
import { ChangeOrgPlan } from '@/modules/organization/application/change-org-plan';
import { PrismaOrganizationRepository } from '@/modules/organization/infrastructure/prisma-organization-repository';
import { Webhooks } from '@polar-sh/nextjs';
import { revalidatePath } from 'next/cache';

export const POST = Webhooks({
  webhookSecret: env.POLAR_WEBHOOK_SECRET,
  onSubscriptionActive: async (payload) => {
    const service = new ChangeOrgPlan(new PrismaOrganizationRepository(database));
    await service.run(payload.data.metadata.orgId as string, payload.data.metadata.type as string);
    revalidatePath('/organization/billing');
  },
  onSubscriptionCanceled: async (payload) => {
    const service = new ChangeOrgPlan(new PrismaOrganizationRepository(database));
    await service.run(payload.data.metadata.orgId as string, 'free');
    revalidatePath('/organization/billing');
  },
  onSubscriptionRevoked: async (payload) => {
    const service = new ChangeOrgPlan(new PrismaOrganizationRepository(database));
    await service.run(payload.data.metadata.orgId as string, 'free');
    revalidatePath('/organization/billing');
  },
});
