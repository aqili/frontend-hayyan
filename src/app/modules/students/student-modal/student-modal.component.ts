import { Component, OnInit, numberAttribute } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseModalComponent } from '@base/base-modal.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { UserType } from '@proxy/domain/shared/enums';
import { StudentService } from '@proxy/services';
import { StudntDto, UserDto } from '@proxy/users';

import { dateRangeValidator } from '@shared/service/form/form-validation';

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
})
export class StudentModalComponent extends BaseModalComponent implements OnInit {
  get Service(): StudentService {
    return this.getByInjector(StudentService);
  }
  studentId = null;
  selectedStudent = {} as StudntDto; // reset the selected student
  isEdit = false;
  ngOnInit(): void {
    super.ngOnInit();
    if (this.studentId) this.getByParams(this.studentId);
  }
  protected buildForm(): void {
    this.form = this.FormBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      lastName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(200)],
      ],
      telephone: ['', [Validators.minLength(8), Validators.maxLength(13)]],
      id: Number,
      userType: [UserType.student],
      appUserId: String,
    });
  }
  protected save(): Promise<ResponseData<StudntDto>> {
    if (this.isEdit) {
      return firstValueFrom(this.Service.update(this.form.getRawValue()));
    }
    return firstValueFrom(this.Service.create(this.form.getRawValue()));
  }
  protected getByParamsPromise(item: any): Promise<ResponseData<any>> {
    return firstValueFrom(this.Service.get(item));
  }
}
