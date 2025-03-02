import { mapEnumToOptions } from '@abp/ng.core';

export enum UserType {
  admin = 1,
  Instractor = 2,
  student = 3,
}

export const userTypeOptions = mapEnumToOptions(UserType);
