import { Criteria, Direction, Filter, Order, Pagination } from '@/lib/ddd/core/criteria';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Provider } from '../domain/provider';
import { ProviderRepository } from '../domain/provider-repository';

interface ListProvidersRequest {
  filters?: Filter[];
  order?: Order;
  pagination?: Pagination;
}

export class ListProviders {
  constructor(private providerRepository: ProviderRepository) {}

  async run(request: ListProvidersRequest): Promise<Primitives<Provider>[]> {
    const criteria = Criteria.fromValues(
      request.filters ?? [],
      request.order ?? { field: 'createdAt', order: Direction.DESC },
      request.pagination ?? { offset: 0, limit: 10 }
    );
    const providers = await this.providerRepository.search(criteria);
    return providers.map((provider) => provider.toPrimitives());
  }
}
