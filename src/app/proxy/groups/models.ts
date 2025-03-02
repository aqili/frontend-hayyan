import type { StudntDto } from '../users/models';

export interface AddStudentsToGroupDto {
  groupId: number;
  studentIds: number[];
}

export interface CreateUpdateGroupDto {
  name: string;
  description?: string;
  studentIds: number[];
}

export interface GroupDto {
  id?: number;
  name?: string;
  description?: string;
  students: StudntDto[];
}
