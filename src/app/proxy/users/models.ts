import type { EntityDto } from '@abp/ng.core';
import type { UserType } from '../domain/shared/enums/user-type.enum';

export interface StudntDto extends UserDto {
  isActive: any;
}

export interface UserDto extends EntityDto<number> {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  telephone?: string;
  appUserId?: string;
  userType: UserType;
}

export interface InstractorDto extends UserDto {
  isActive: any;
  userType: UserType;
}

export interface InstructorAssignedCoursesDto {
  fullName?: string;
  courseName?: string;
  courseStartDate?: string;
  courseEndDate?: string;
  groupName?: string;
}

export interface InstructorAssignedCoursesList {
  instructorAssignedCourses: InstructorAssignedCoursesDto[];
}

export interface ResponseUploadBatchDto {
  fileBytes: number[];
  validUsers: UserBaseDto[];
}

export interface ResponseValidatePasswordDTO {
  email?: string;
  isValid: any;
  isExpired: any;
}

export interface UserBaseDto {
  appUserId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  telephone?: string;
  isActive: any;
  id: number;
  praxiResponse?: string;
}

export interface ValidatePasswordTokenInput {
  id: string;
  token: string;
  password: string;
}
