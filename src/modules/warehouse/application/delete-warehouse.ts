import { WarehouseRepository } from '../domain/warehouse-repository';

interface DeleteWarehouseRequest {
  warehouseId: string;
}

export class DeleteWarehouse {
  constructor(private warehouseRepository: WarehouseRepository) {}

  async run({ warehouseId }: DeleteWarehouseRequest): Promise<void> {
    await this.warehouseRepository.delete(warehouseId);
  }
}
