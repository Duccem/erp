import { PrismaClient } from '@prisma/client';
import { OrganizationRepository } from '../domain/organization-repository';

export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.organization;
  }

  async changePlan(organizationId: string, plan: string) {
    await this.model.update({
      where: {
        id: organizationId,
      },
      data: {
        plan,
      },
    });
  }
}
