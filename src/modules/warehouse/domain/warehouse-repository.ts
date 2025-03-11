import { Criteria } from '@/lib/ddd/core/criteria';
import { Warehouse } from './warehouse';

export interface WarehouseRepository {
  save(warehouse: Warehouse): Promise<void>;
  search(criteria: Criteria): Promise<Warehouse[]>;
  searchOne(criteria: Criteria): Promise<Warehouse | null>;
  delete(warehouseId: string): Promise<void>;
}
