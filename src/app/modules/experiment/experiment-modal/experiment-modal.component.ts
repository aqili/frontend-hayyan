import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseModalComponent } from '@base/base-modal.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { ExperimentDto, ExperimentService } from '@proxy/experiments';

import { dateRangeValidator } from '@shared/service/form/form-validation';

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-experiment-modal',
  templateUrl: './experiment-modal.component.html',
})
export class ExperimentModalComponent extends BaseModalComponent implements OnInit {
  get Service(): ExperimentService {
    return this.getByInjector(ExperimentService);
  }
  experimentId = null;
  selectedExperiment = {} as ExperimentDto; // reset the selected cxperiment
  isEdit = false;
  ngOnInit(): void {
    super.ngOnInit();
    if (this.experimentId) this.getByParams(this.experimentId);
  }
  protected buildForm(): void {
    this.form = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      description: [null, Validators.maxLength(7000)],
      isActive: [null],
    });
  }
  protected save(): Promise<ResponseData<ExperimentDto>> {
    if (this.isEdit) {
      return this.Service.update(this.selectedExperiment.id, this.form.getRawValue()).toPromise();
    }
    return this.Service.create(this.form.getRawValue()).toPromise();
  }
  protected getByParamsPromise(item: any): Promise<ResponseData<any>> {
    return firstValueFrom(this.Service.get(item));
  }
  protected fillFormData(data: any): void {
    (data.startDate = data.startDate ? new Date(data.startDate) : null),
      (data.endDate = data.endDate ? new Date(data.endDate) : null),
      this.form.patchValue(data);
  }
}
