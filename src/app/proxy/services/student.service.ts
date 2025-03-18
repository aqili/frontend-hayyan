import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ListSearchDto, LookupDto } from '../common/models';
import type { ResponseData } from '../domain/shared/common/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { ResponseUploadBatchDto, StudentDto } from '../users/models';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  apiName = 'Default';
  

  activate = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: `/api/app/student/${id}/activate`,
    },
    { apiName: this.apiName,...config });
  

  create = (user: StudentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<StudentDto>>({
      method: 'POST',
      url: '/api/app/student',
      body: user,
    },
    { apiName: this.apiName,...config });
  

  deActivate = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: `/api/app/student/${id}/de-activate`,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'DELETE',
      url: `/api/app/student/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<StudentDto>>({
      method: 'GET',
      url: `/api/app/student/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllStudents = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, StudentDto[]>({
      method: 'GET',
      url: '/api/app/student/students',
    },
    { apiName: this.apiName,...config });
  

  getLookupStudents = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/student/lookup-students',
    },
    { apiName: this.apiName,...config });
  

  list = (input: ListSearchDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<StudentDto>>({
      method: 'POST',
      url: '/api/app/student/list',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  sendActiveEmailById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'POST',
      url: `/api/app/student/${id}/send-active-email`,
    },
    { apiName: this.apiName,...config });
  

  update = (user: StudentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<StudentDto>>({
      method: 'PUT',
      url: '/api/app/student',
      body: user,
    },
    { apiName: this.apiName,...config });
  

  uploadExcelUser = (file: IFormFile, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ResponseUploadBatchDto>>({
      method: 'POST',
      url: '/api/app/student/upload-excel-user',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
