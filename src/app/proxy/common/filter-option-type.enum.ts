import { mapEnumToOptions } from '@abp/ng.core';

export enum FilterOptionType {
  Date = 0,
  List = 1,
  Text = 2,
}

export const filterOptionTypeOptions = mapEnumToOptions(FilterOptionType);
