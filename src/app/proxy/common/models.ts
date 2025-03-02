import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { FilterOptionType } from './filter-option-type.enum';

export interface ListSearchDto extends PagedAndSortedResultRequestDto {
  columnName?: string;
  columnValue?: string;
  filterOptionType?: FilterOptionType;
}

export interface LookupDto {
  id: number;
  name?: string;
}
