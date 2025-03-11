import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { Warehouse } from '../domain/warehouse';
import { WarehouseRepository } from '../domain/warehouse-repository';

interface SaveWarehouseRequest {
  id: string;
  name: string;
  address: string;
  organizationId: string;
}

export class SaveWarehouse {
  constructor(private warehouseRepository: WarehouseRepository) {}

  async run({ id, name, address, organizationId }: SaveWarehouseRequest): Promise<void> {
    try {
      const criteria = Criteria.fromValues([{ field: 'id', value: id, operator: Operator.EQUAL }]);
      let warehouse = await this.warehouseRepository.searchOne(criteria);

      if (!warehouse) {
        warehouse = Warehouse.create(id, name, address, organizationId);
      } else {
        warehouse.update(name, address);
      }

      await this.warehouseRepository.save(warehouse);
    } catch (error) {
      console.log(error);
    }
  }
}
