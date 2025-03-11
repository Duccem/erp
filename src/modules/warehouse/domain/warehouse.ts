import { Aggregate } from '@/lib/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@/lib/ddd/core/value-object';
import { Uuid } from '@/lib/ddd/core/value-objects/uuid';
import { Primitives } from '@/lib/ddd/types/primitives';

export class Warehouse extends Aggregate {
  constructor(
    id: Uuid,
    public name: StringValueObject,
    public address: StringValueObject,
    public organizationId: Uuid,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Warehouse> {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      address: this.address.getValue(),
      organizationId: this.organizationId.toString(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(data: Primitives<Warehouse>): Warehouse {
    return new Warehouse(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new StringValueObject(data.address),
      new Uuid(data.organizationId),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(id: string, name: string, address: string, organizationId: string): Warehouse {
    return new Warehouse(
      new Uuid(id),
      new StringValueObject(name),
      new StringValueObject(address),
      new Uuid(organizationId),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  update(name: string | undefined, address: string | undefined) {
    this.name = name ? new StringValueObject(name) : this.name;
    this.address = address ? new StringValueObject(address) : this.address;
  }
}
