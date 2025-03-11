import { Criteria, Direction, Filter, Operator, Order, Pagination } from '@/lib/ddd/core/criteria';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Warehouse } from '../domain/warehouse';
import { WarehouseRepository } from '../domain/warehouse-repository';

interface ListWarehousesRequest {
  filters?: Filter[];
  order?: Order;
  pagination?: Pagination;
  organizationId: string;
}

export class ListWarehouses {
  constructor(private warehouseRepository: WarehouseRepository) {}

  async run(request: ListWarehousesRequest): Promise<Primitives<Warehouse>[]> {
    const criteria = Criteria.fromValues(
      [
        { field: 'organizationId', operator: Operator.EQUAL, value: request.organizationId },
        ...(request.filters ?? []),
      ],
      request.order ?? { field: 'createdAt', order: Direction.DESC },
      request.pagination ?? { offset: 0, limit: 10 }
    );
    const warehouses = await this.warehouseRepository.search(criteria);
    return warehouses.map((warehouse) => warehouse.toPrimitives());
  }
}
