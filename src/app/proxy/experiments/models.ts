
export interface CreateUpdateExperimentDto {
  name: string;
  startDate?: string;
  endDate?: string;
  isActive: any;
  description?: string;
}

export interface ExperimentDto {
  id?: number;
  praxilabsId?: string;
  arabicTitle?: string;
  englishTitle?: string;
  arabicDescription?: string;
  englishDescription?: string;
  arObjective?: string;
  enObjective?: string;
  path?: string;
  code?: string;
  active: any;
  deleted: any;
  duration: number;
  logo?: string;
  categoryId?: string;
  scienceId?: string;
  quizId?: string;
  subCategoryId?: string;
  name?: string;
  description?: string;
  isActive: any;
  startDate?: string;
  endDate?: string;
}

export interface ExperimentListDto {
  experiments: ExperimentDto[];
}
