import { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export class TableConfig {
  columns?: Columns[] = [];
  rowActions?: RowActions[] = [];
  rowsPerPage?: number = 10;
  addBtn?: AddBtn;
  hideSearch?: boolean = true;
  searchColumnFilter?: SearchColumnFilter[];
  uploadExcelApi?: string;
  pathExampleExcel?: string;
}

export class SearchColumnFilter {
  name: string;
  displayName: string;
  filterOptionType?: FilterOptionTypeEnum;
}
export interface RowActionWithData<A> {
  actionType: ActionType;
  rowData: A;
  otherFunction?: Function;
}
export enum FilterOptionTypeEnum {
  Date,
  List,
  Text,
}
export enum ColumnTypeEnum {
  Text = 0,
  Date = 1,
  DateOnly,
  CheckBox,
  RadioButton,

  Email,

  Enum,

  Color,
  Number,
}
export class Columns {
  title?: string;
  dataProperty?: string;
  type?: ColumnTypeEnum = ColumnTypeEnum.Text;
}
export interface AddBtn {
  show?: boolean;
  data: RowActions;
}
export interface RowActions {
  label?: string;
  Icon?: string;
  className?: string;
  actionType?: ActionType;
  showOption?: (x) => boolean;
  otherFunction?: Function;
}
export enum ActionType {
  Add,
  Edit,
  Delete,
  Other,
  HardDelete,
  ExcelResponse,
}
