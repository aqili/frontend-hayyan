import type { ExperimentDto } from '../experiments/models';

export interface AddExperimentsToCourseDto {
  courseId: number;
  experimentIds: number[];
}

export interface CourseDto {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  isActive: any;
  description?: string;
  experiments: ExperimentDto[];
  instractorId?: number;
  groupId?: number;
  groupsCount:number;
  experimentsCount:number;
}

export interface CreateUpdateCourseDto {
  name: string;
  startDate?: string;
  endDate?: string;
  isActive: any;
  description?: string;
  instractorId?: number;
  groupId?: number;
  experimentIds: number[];
}

export interface StudentAssignedCoursesDto {
  courseName?: string;
  courseStartDate?: string;
  courseEndDate?: string;
  groupName?: string;
  instractorId?: number;
  groupId?: number;
  courseId?: number;
}

export interface StudentAssignedCoursesList {
  studentAssignedCourses: StudentAssignedCoursesDto[];
}
