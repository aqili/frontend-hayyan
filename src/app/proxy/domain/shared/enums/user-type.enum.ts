import { mapEnumToOptions } from '@abp/ng.core';

export enum UserType {
  admin = 1,
  Instractor = 2,
  Student = 3,
}

export const userTypeOptions = mapEnumToOptions(UserType);
