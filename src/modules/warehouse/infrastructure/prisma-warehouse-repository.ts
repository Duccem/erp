import { PrismaCriteriaConverter } from '@/lib/database/converter';
import { Criteria } from '@/lib/ddd/core/criteria';
import { Primitives } from '@/lib/ddd/types/primitives';
import { PrismaClient } from '@prisma/client';
import { Warehouse } from '../domain/warehouse';
import { WarehouseRepository } from '../domain/warehouse-repository';

export class PrismaWarehouseRepository implements WarehouseRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}
  get model() {
    return this.client.warehouse;
  }
  async save(warehouse: Warehouse): Promise<void> {
    const data = warehouse.toPrimitives();
    await this.model.upsert({
      where: { id: data.id },
      update: {
        name: data.name,
        address: data.address,
      },
      create: {
        id: data.id,
        name: data.name,
        address: data.address,
        organizationId: data.organizationId,
      },
    });
  }
  async search(criteria: Criteria): Promise<Warehouse[]> {
    const { where, orderBy, skip, take } = this.converter.criteria(criteria);
    const warehouses = await this.model.findMany({
      where,
      orderBy,
      skip,
      take,
    });
    return warehouses.map((data) => Warehouse.fromPrimitives(data as unknown as Primitives<Warehouse>));
  }
  async searchOne(criteria: Criteria): Promise<Warehouse | null> {
    const { where } = this.converter.criteria(criteria);
    const warehouse = await this.model.findFirst({ where });
    if (!warehouse) return null;
    return Warehouse.fromPrimitives(warehouse as unknown as Primitives<Warehouse>);
  }
  async delete(warehouseId: string): Promise<void> {
    await this.model.delete({ where: { id: warehouseId } });
  }
}
