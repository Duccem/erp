import { Aggregate } from '@/lib/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@/lib/ddd/core/value-object';
import { Uuid } from '@/lib/ddd/core/value-objects/uuid';
import { Primitives } from '@/lib/ddd/types/primitives';
import { ProviderStatus, ProviderStatusValue } from './provider-status';
import { ProviderType, ProviderTypeValue } from './provider-type';

export class Provider extends Aggregate {
  constructor(
    id: Uuid,
    public name: StringValueObject,
    public description: StringValueObject,
    public type: ProviderType,
    public status: ProviderStatus,
    public phone: StringValueObject,
    public email: StringValueObject,
    public address: StringValueObject,
    public image: StringValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Provider> {
    return {
      id: this.id.toString(),
      name: this.name.getValue(),
      description: this.description.getValue(),
      type: this.type.getValue(),
      status: this.status.getValue(),
      phone: this.phone.getValue(),
      email: this.email.getValue(),
      address: this.address.getValue(),
      image: this.image.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(data: Primitives<Provider>): Provider {
    return new Provider(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new StringValueObject(data.description),
      ProviderType.fromValue(data.type),
      ProviderStatus.fromValue(data.status),
      new StringValueObject(data.phone),
      new StringValueObject(data.email),
      new StringValueObject(data.address),
      new StringValueObject(data.image),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(
    id: string,
    name: string,
    description: string,
    type: ProviderTypeValue,
    status: ProviderStatusValue,
    phone: string,
    email: string,
    address: string,
    image: string
  ): Provider {
    return new Provider(
      new Uuid(id),
      new StringValueObject(name),
      new StringValueObject(description),
      ProviderType.fromValue(type),
      ProviderStatus.fromValue(status),
      new StringValueObject(phone),
      new StringValueObject(email),
      new StringValueObject(address),
      new StringValueObject(image),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  update(
    name: string | undefined,
    description: string | undefined,
    type: ProviderTypeValue | undefined,
    status: ProviderStatusValue | undefined,
    phone: string | undefined,
    email: string | undefined,
    address: string | undefined,
    image: string | undefined
  ) {
    this.name = name ? new StringValueObject(name) : this.name;
    this.description = description ? new StringValueObject(description) : this.description;
    this.type = type ? ProviderType.fromValue(type) : this.type;
    this.status = status ? ProviderStatus.fromValue(status) : this.status;
    this.phone = phone ? new StringValueObject(phone) : this.phone;
    this.email = email ? new StringValueObject(email) : this.email;
    this.address = address ? new StringValueObject(address) : this.address;
    this.image = image ? new StringValueObject(image) : this.image;
  }
}
