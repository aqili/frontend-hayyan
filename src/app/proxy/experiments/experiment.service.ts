import type { CreateUpdateExperimentDto, ExperimentDto, ExperimentListDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../common/models';
import type { ResponseData } from '../domain/shared/common/models';

@Injectable({
  providedIn: 'root',
})
export class ExperimentService {
  apiName = 'Default';
  

  create = (input: CreateUpdateExperimentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ExperimentDto>>({
      method: 'POST',
      url: '/api/app/experiment',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'DELETE',
      url: `/api/app/experiment/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ExperimentDto>>({
      method: 'GET',
      url: `/api/app/experiment/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllExperiments = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/experiment/experiments',
    },
    { apiName: this.apiName,...config });
  

  getCourseExpirmentsByCourseId = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ExperimentListDto>>({
      method: 'GET',
      url: `/api/app/experiment/course-expirments/${courseId}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ExperimentDto>>({
      method: 'GET',
      url: '/api/app/experiment',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  startExperimentByCourseIdAndExperimentIdAndPraxisIdAndGroupId = (courseId: number, experimentId: number, PraxisId: string, groupId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<string>>({
      method: 'POST',
      url: '/api/app/experiment/start-experiment',
      params: { courseId, experimentId, praxisId: PraxisId, groupId },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateExperimentDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ExperimentDto>>({
      method: 'PUT',
      url: `/api/app/experiment/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateExp = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/app/experiment/UpdateAll',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
