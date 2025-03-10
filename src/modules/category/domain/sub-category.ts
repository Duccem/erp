import { StringValueObject } from '@/lib/ddd/core/value-object';
import { Uuid } from '@/lib/ddd/core/value-objects/uuid';
import { Primitives } from '@/lib/ddd/types/primitives';

export class SubCategory {
  constructor(public id: Uuid, public name: StringValueObject, public color: StringValueObject) {}

  toPrimitives(): Primitives<SubCategory> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      color: this.color.getValue(),
    };
  }

  static fromPrimitives(primitives: Primitives<SubCategory>): SubCategory {
    return new SubCategory(
      new Uuid(primitives.id),
      new StringValueObject(primitives.name),
      new StringValueObject(primitives.color)
    );
  }

  static create(id: string, name: string, color: string): SubCategory {
    return new SubCategory(new Uuid(id), new StringValueObject(name), new StringValueObject(color));
  }
}
