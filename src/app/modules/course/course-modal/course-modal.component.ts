import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseModalComponent } from '@base/base-modal.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { CourseDto, CourseService } from '@proxy/courses';
import { GroupService } from '@proxy/groups';
import { InstractorService } from '@proxy/services';
import { ExperimentDto, ExperimentService } from '@proxy/experiments';
import { LookupDto } from '@proxy/common';

import { dateRangeValidator } from '@shared/service/form/form-validation';

import { firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
})
export class CourseModalComponent extends BaseModalComponent implements OnInit {
  get Service(): CourseService {
    return this.getByInjector(CourseService);
  }
  get GroupService(): GroupService {
    return this.getByInjector(GroupService);
  }
  get experimentService(): ExperimentService {
    return this.getByInjector(ExperimentService);
  }
  get InstructorService(): InstractorService {
    return this.getByInjector(InstractorService);
  }
  groups: LookupDto[] = [];
  instructors: LookupDto[] = [];

  courseId = null;
  experiments: LookupDto[] = [];

  selectedCourse = {} as CourseDto; // reset the selected course
  isEdit = false;
  ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromApis().subscribe(
      responses => {
        this.groups = responses[0];
        this.instructors = responses[1];
        this.experiments = responses[2];
      },
      error => {
        console.error(error);
      },
    );
    if (this.courseId) this.getByParams(this.courseId);
  }

  getDataFromApis() {
    const groups = this.GroupService.getAllGroups();
    const instructor = this.InstructorService.getAllInstructor();
    const experiment = this.experimentService.getAllExperiments();

    return forkJoin([groups, instructor, experiment]);
  }
  protected buildForm(): void {
    this.form = this.FormBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
        description: [null, [Validators.maxLength(500), Validators.required]],
        startDate: [
          this.selectedCourse.startDate ? new Date(this.selectedCourse.startDate) : null,
          Validators.required,
        ],
        endDate: [
          this.selectedCourse.endDate ? new Date(this.selectedCourse.endDate) : null,
          Validators.required,
        ],
        isActive: [true],
        experimentIds: [],
        groupId: [null, Validators.required],
        instractorId: [null, Validators.required],
      },
      { validators: dateRangeValidator('startDate', 'endDate') },
    );
  }
  protected save(): Promise<ResponseData<CourseDto>> {
    if (this.isEdit) {
      return this.Service.update(this.selectedCourse.id, this.form.getRawValue()).toPromise();
    }
    return this.Service.create(this.form.getRawValue()).toPromise();
  }
  protected getByParamsPromise(item: any): Promise<ResponseData<any>> {
    return firstValueFrom(this.Service.get(item));
  }
  protected fillFormData(data: any): void {
    super.fillFormData(data);
    this.f.experimentIds.setValue(data.experiments.map(s => s.id));

    (data.startDate = data.startDate ? new Date(data.startDate) : null),
      (data.endDate = data.endDate ? new Date(data.endDate) : null),
      this.form.patchValue(data);
  }
}
