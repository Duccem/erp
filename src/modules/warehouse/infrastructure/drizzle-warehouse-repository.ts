import { database } from '@/lib/database/drizzle/database';
import { warehouse } from '@/lib/database/drizzle/schema';
import { Criteria } from '@/lib/ddd/core/criteria';
import { Warehouse } from '../domain/warehouse';
import { WarehouseRepository } from '../domain/warehouse-repository';

export class DrizzleWarehouseRepository implements WarehouseRepository {
  async save(data: Warehouse): Promise<void> {
    const primitives = data.toPrimitives();
    await database.insert(warehouse).values(primitives).execute();
  }
  search(criteria: Criteria): Promise<Warehouse[]> {
    throw new Error('Method not implemented.');
  }
  searchOne(criteria: Criteria): Promise<Warehouse | null> {
    throw new Error('Method not implemented.');
  }
  delete(warehouseId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
