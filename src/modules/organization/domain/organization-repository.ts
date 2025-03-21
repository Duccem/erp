export interface OrganizationRepository {
  changePlan(organizationId: string, plan: string): Promise<void>;
}
