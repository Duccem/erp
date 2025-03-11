import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { NotFoundError } from '@/lib/ddd/core/errors/not-found-error';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Warehouse } from '../domain/warehouse';
import { WarehouseRepository } from '../domain/warehouse-repository';

interface FindWarehouseRequest {
  warehouseId: string;
}

export class FindWarehouse {
  constructor(private warehouseRepository: WarehouseRepository) {}

  async run({ warehouseId }: FindWarehouseRequest): Promise<Primitives<Warehouse>> {
    const criteria = Criteria.fromValues([{ field: 'id', value: warehouseId, operator: Operator.EQUAL }]);
    const warehouse = await this.warehouseRepository.searchOne(criteria);

    if (!warehouse) {
      throw new NotFoundError('Warehouse not found');
    }

    return warehouse.toPrimitives();
  }
}
