import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../../common/models';

@Injectable({
  providedIn: 'root',
})
export class StudentHistoryExperimentsService {
  apiName = 'Default';
  

  getCourses = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/student-history-experiments/courses',
    },
    { apiName: this.apiName,...config });
  

  getExperimentUrl = (studentId: string, expermientId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/student-history-experiments/experiment-url',
      params: { studentId, expermientId },
    },
    { apiName: this.apiName,...config });
  

  getExperimentsByCourseId = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: `/api/app/student-history-experiments/experiments-by-course-id/${courseId}`,
    },
    { apiName: this.apiName,...config });
  

  getGroupsByCourseId = (courseId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: `/api/app/student-history-experiments/groups-by-course-id/${courseId}`,
    },
    { apiName: this.apiName,...config });
  

  getStudentsByGroupId = (groupId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: `/api/app/student-history-experiments/students-by-group-id/${groupId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
