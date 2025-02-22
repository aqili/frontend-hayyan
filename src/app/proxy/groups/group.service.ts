import type { AddStudentsToGroupDto, CreateUpdateGroupDto, GroupDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../common/models';
import type { ResponseData } from '../domain/shared/common/models';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  apiName = 'Default';
  

  addStudentsToGroupByStudentsToGroupDto = (studentsToGroupDto: AddStudentsToGroupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/group/students-to-group',
      body: studentsToGroupDto,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateUpdateGroupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<GroupDto>>({
      method: 'POST',
      url: '/api/app/group',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'DELETE',
      url: `/api/app/group/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<GroupDto>>({
      method: 'GET',
      url: `/api/app/group/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllGroups = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/group/groups',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GroupDto>>({
      method: 'GET',
      url: '/api/app/group',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateGroupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<GroupDto>>({
      method: 'PUT',
      url: `/api/app/group/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
