import { ProviderRepository } from '../domain/provider-repository';

interface DeleteProviderRequest {
  providerId: string;
}

export class DeleteProvider {
  constructor(private providerRepository: ProviderRepository) {}

  async run({ providerId }: DeleteProviderRequest): Promise<void> {
    await this.providerRepository.delete(providerId);
  }
}
