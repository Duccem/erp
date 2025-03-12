import { Enum } from '@/lib/ddd/core/value-objects/enum';

export enum ProviderStatusValue {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class ProviderStatus extends Enum<ProviderStatusValue> {
  constructor(value: ProviderStatusValue) {
    super(value, Object.values(ProviderStatusValue));
  }

  static Active() {
    return new ProviderStatus(ProviderStatusValue.ACTIVE);
  }

  static Inactive() {
    return new ProviderStatus(ProviderStatusValue.INACTIVE);
  }

  static fromValue(value: ProviderStatusValue): ProviderStatus {
    return new ProviderStatus(value);
  }
}
