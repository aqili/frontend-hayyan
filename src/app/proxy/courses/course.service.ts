import type { AddExperimentsToCourseDto, CourseDto, CreateUpdateCourseDto, StudentAssignedCoursesList } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ListSearchDto } from '../common/models';
import type { ResponseData } from '../domain/shared/common/models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiName = 'Default';
  

  addExperimentToCourseByExperimentsToCourseDto = (experimentsToCourseDto: AddExperimentsToCourseDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/course/experiment-to-course',
      body: experimentsToCourseDto,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateUpdateCourseDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<CourseDto>>({
      method: 'POST',
      url: '/api/app/course',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<boolean>>({
      method: 'DELETE',
      url: `/api/app/course/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<CourseDto>>({
      method: 'GET',
      url: `/api/app/course/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: ListSearchDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CourseDto>>({
      method: 'GET',
      url: '/api/app/course',
      params: { columnName: input.columnName, columnValue: input.columnValue, filterOptionType: input.filterOptionType, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getStudentCourses = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<StudentAssignedCoursesList>>({
      method: 'GET',
      url: '/api/app/course/student-courses',
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCourseDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<CourseDto>>({
      method: 'PUT',
      url: `/api/app/course/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
