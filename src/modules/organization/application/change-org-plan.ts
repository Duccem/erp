import { OrganizationRepository } from '../domain/organization-repository';

export class ChangeOrgPlan {
  constructor(private repository: OrganizationRepository) {}

  async run(organizationId: string, plan: string) {
    await this.repository.changePlan(organizationId, plan);
  }
}
