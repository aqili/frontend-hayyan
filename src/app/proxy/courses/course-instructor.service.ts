import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseData } from '../domain/shared/common/models';
import type { InstructorAssignedCoursesList } from '../users/models';

@Injectable({
  providedIn: 'root',
})
export class CourseInstructorService {
  apiName = 'Default';
  

  getInstructorAssignedCourses = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<InstructorAssignedCoursesList>>({
      method: 'GET',
      url: '/api/app/course-instructor/instructor-assigned-courses',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
