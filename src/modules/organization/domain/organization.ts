import { Aggregate } from '@/lib/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@/lib/ddd/core/value-object';
import { Uuid } from '@/lib/ddd/core/value-objects/uuid';
import { Primitives } from '@/lib/ddd/types/primitives';

export class Organization extends Aggregate {
  constructor(
    id: Uuid,
    public name: StringValueObject,
    public slug: StringValueObject,
    public logo: StringValueObject,
    public plan: StringValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Organization> {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      slug: this.slug.getValue(),
      logo: this.logo.getValue(),
      plan: this.plan.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(data: Primitives<Organization>): Organization {
    return new Organization(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new StringValueObject(data.slug),
      new StringValueObject(data.logo),
      new StringValueObject(data.plan),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.createdAt)
    );
  }
}
