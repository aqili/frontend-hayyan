import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ListSearchDto, LookupDto } from '../common/models';
import type { ResponseData } from '../domain/shared/common/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { InstractorDto, ResponseUploadBatchDto, ResponseValidatePasswordDTO, ValidatePasswordTokenInput } from '../users/models';

@Injectable({
  providedIn: 'root',
})
export class InstractorService {
  apiName = 'Default';
  

  activate = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: `/api/app/instractor/${id}/activate`,
    },
    { apiName: this.apiName,...config });
  

  create = (user: InstractorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<InstractorDto>>({
      method: 'POST',
      url: '/api/app/instractor',
      body: user,
    },
    { apiName: this.apiName,...config });
  

  deActivate = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: `/api/app/instractor/${id}/de-activate`,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'DELETE',
      url: `/api/app/instractor/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<InstractorDto>>({
      method: 'GET',
      url: `/api/app/instractor/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllInstructor = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/instractor/instructor',
    },
    { apiName: this.apiName,...config });
  

  getInstractorList = (input: ListSearchDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<InstractorDto>>({
      method: 'GET',
      url: '/api/app/instractor/instractor-list',
      params: { columnName: input.columnName, columnValue: input.columnValue, filterOptionType: input.filterOptionType, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  sendActiveEmailById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: `/api/app/instractor/${id}/send-active-email`,
    },
    { apiName: this.apiName,...config });
  

  update = (user: InstractorDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<InstractorDto>>({
      method: 'PUT',
      url: '/api/app/instractor',
      body: user,
    },
    { apiName: this.apiName,...config });
  

  uploadExcelUser = (file: IFormFile, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ResponseUploadBatchDto>>({
      method: 'POST',
      url: '/api/app/instractor/upload-excel-user',
      body: file,
    },
    { apiName: this.apiName,...config });
  

  validatePasswordTokenByInput = (input: ValidatePasswordTokenInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ResponseValidatePasswordDTO>>({
      method: 'POST',
      url: '/api/app/instractor/validate-password-token',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
