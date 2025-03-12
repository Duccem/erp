import { PrismaCriteriaConverter } from '@/lib/database/converter';
import { Criteria } from '@/lib/ddd/core/criteria';
import { Primitives } from '@/lib/ddd/types/primitives';
import { PrismaClient } from '@prisma/client';
import { Provider } from '../domain/provider';
import { ProviderRepository } from '../domain/provider-repository';

export class PrismaProviderRepository implements ProviderRepository {
  private converter = new PrismaCriteriaConverter();

  constructor(private prisma: PrismaClient) {}

  get model() {
    return this.prisma.provider;
  }

  async save(provider: Provider): Promise<void> {
    const data = provider.toPrimitives();

    await this.model.upsert({
      where: { id: data.id },
      update: {
        name: data.name,
        description: data.description,
        type: data.type,
        status: data.status,
        phone: data.phone,
        email: data.email,
        address: data.address,
        image: data.image,
      },
      create: {
        id: data.id,
        name: data.name,
        description: data.description,
        type: data.type,
        status: data.status,
        phone: data.phone,
        email: data.email,
        address: data.address,
        image: data.image,
      },
    });
  }

  async search(criteria: Criteria): Promise<Provider[]> {
    const { where, take, skip, orderBy } = this.converter.criteria(criteria);
    const providers = await this.model.findMany({ where, take, skip, orderBy });

    return providers.map((provider) => Provider.fromPrimitives(provider as unknown as Primitives<Provider>));
  }

  async searchOne(criteria: Criteria): Promise<Provider | null> {
    const { where } = this.converter.criteria(criteria);
    const provider = await this.model.findFirst({ where });

    if (!provider) return null;

    return Provider.fromPrimitives(provider as unknown as Primitives<Provider>);
  }

  async delete(providerId: string): Promise<void> {
    await this.model.update({ where: { id: providerId }, data: { deletedAt: new Date() } });
  }
}
