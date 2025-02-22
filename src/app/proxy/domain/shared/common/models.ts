
export interface ErrorModel {
  code?: string;
  message?: string;
}

export interface ResponseData<T> {
  isValid: any;
  firstErrorMessage?: string;
  listErrorModel: ErrorModel[];
  data: T;
  sucessMessage?: string;
}
