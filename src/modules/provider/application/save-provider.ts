import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { Provider } from '../domain/provider';
import { ProviderRepository } from '../domain/provider-repository';

interface SaveProviderRequest {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  phone: string;
  email: string;
  address: string;
  image: string;
}

export class SaveProvider {
  constructor(private providerRepository: ProviderRepository) {}

  async run({ id, name, description, type, status, phone, email, address, image }: SaveProviderRequest): Promise<void> {
    const criteria = Criteria.fromValues([{ field: 'id', value: id, operator: Operator.EQUAL }]);
    let provider = await this.providerRepository.searchOne(criteria);

    if (!provider) {
      provider = Provider.create(id, name, description, type as any, status as any, phone, email, address, image);
    } else {
      provider.update(name, description, type as any, status as any, phone, email, address, image);
    }

    await this.providerRepository.save(provider);
  }
}
