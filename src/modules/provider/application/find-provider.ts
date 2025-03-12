import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { NotFoundError } from '@/lib/ddd/core/errors/not-found-error';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Provider } from '../domain/provider';
import { ProviderRepository } from '../domain/provider-repository';

interface FindProviderRequest {
  providerId: string;
}

export class FindProvider {
  constructor(private providerRepository: ProviderRepository) {}

  async run({ providerId }: FindProviderRequest): Promise<Primitives<Provider>> {
    const criteria = Criteria.fromValues([{ field: 'id', value: providerId, operator: Operator.EQUAL }]);
    const provider = await this.providerRepository.searchOne(criteria);

    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    return provider.toPrimitives();
  }
}
