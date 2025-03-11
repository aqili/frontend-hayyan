import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseModalComponent } from '@base/base-modal.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { UserType } from '@proxy/domain/shared/enums';
import { InstractorService } from '@proxy/services';

import { InstractorDto, UserDto } from '@proxy/users';

import { dateRangeValidator } from '@shared/service/form/form-validation';

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-instructor-modal',
  templateUrl: './instructor-modal.component.html',
})
export class InstructorModalComponent extends BaseModalComponent implements OnInit {
  get Service(): InstractorService {
    return this.getByInjector(InstractorService);
  }
  instructorId = null;
  selectedInstructor = {} as InstractorDto; // reset the selected instructor
  isEdit = false;
  ngOnInit(): void {
    super.ngOnInit();
    if (this.instructorId) this.getByParams(this.instructorId);
  }
  protected buildForm(): void {
    this.form = this.FormBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
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
  protected save(): Promise<ResponseData<InstractorDto>> {
    if (this.isEdit) {
      return firstValueFrom(this.Service.update(this.form.getRawValue()));
    }
    return firstValueFrom(this.Service.create(this.form.getRawValue()));
  }
  protected getByParamsPromise(item: any): Promise<ResponseData<any>> {
    return firstValueFrom(this.Service.get(item));
  }
}
