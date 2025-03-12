import { Criteria } from '@/lib/ddd/core/criteria';
import { Provider } from './provider';

export interface ProviderRepository {
  save(provider: Provider): Promise<void>;
  search(criteria: Criteria): Promise<Provider[]>;
  searchOne(criteria: Criteria): Promise<Provider | null>;
  delete(providerId: string): Promise<void>;
}
