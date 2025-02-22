import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseData } from '../domain/shared/common/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { ResponseUploadBatchDto, StudntDto } from '../users/models';

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
  

  create = (user: StudntDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<StudntDto>>({
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
    this.restService.request<any, ResponseData<StudntDto>>({
      method: 'GET',
      url: `/api/app/student/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllStudents = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, StudntDto[]>({
      method: 'GET',
      url: '/api/app/student/students',
    },
    { apiName: this.apiName,...config });
  

  list = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<StudntDto>>({
      method: 'POST',
      url: '/api/app/student/list',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  update = (user: StudntDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<StudntDto>>({
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
