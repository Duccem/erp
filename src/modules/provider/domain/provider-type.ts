import { Enum } from '@/lib/ddd/core/value-objects/enum';

export enum ProviderTypeValue {
  COMPANY = 'COMPANY',
  PERSON = 'PERSON',
}

export class ProviderType extends Enum<ProviderTypeValue> {
  constructor(value: ProviderTypeValue) {
    super(value, Object.values(ProviderTypeValue));
  }

  static Company() {
    return new ProviderType(ProviderTypeValue.COMPANY);
  }

  static Person() {
    return new ProviderType(ProviderTypeValue.PERSON);
  }

  static fromValue(value: ProviderTypeValue): ProviderType {
    return new ProviderType(value);
  }
}
