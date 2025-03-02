import { Component, OnInit } from '@angular/core';

import { ResponseData } from '@proxy/domain/shared/common';

import { BaseComponent } from './base.component';

@Component({
  template: ``,
})
export abstract class EditBaseComponent extends BaseComponent implements OnInit {
  abstract get Service(): any;
  private response: any;
  private getByParamsResponse: ResponseData<any>;
  ngOnInit(): void {
    super.ngOnInit();
  }
  protected get f() {
    return this.form?.controls;
  }
  protected afterAllDataLoaded() {}

  checkFormValid(): boolean {
    if (this.form.invalid) {
      this.ToasterService.error('::msg_Invalid_Form');
      return false;
    }
    return true;
  }
  checkValidBeforeSubmit(): boolean {
    return true;
  }
  protected beforeSave() {}
  protected onSubmit() {
    this.Logger.info('Form Data', this.form.getRawValue());
    this.Logger.info('Form', this.form);

    if (this.checkFormValid() && this.checkValidBeforeSubmit()) {
      this.beforeSave();
      this.showIntervalLoader();
      this.save().then(
        (res: ResponseData<any>) => {
          this.afterResponse();
          this.hideIntervalLoader();
          if (res.isValid) {
            this.onSubmitSuccess(res);
          } else {
            this.onSubmitFailed(res);
          }
        },
        err => {
          this.Logger.error(err);
          this.afterResponse();

          this.hideIntervalLoader();
          this.onErrorFailed(err);
        }
      ),
        err => {
          this.Logger.error(err);
          this.afterResponse();

          this.hideIntervalLoader();
          this.onErrorFailed(err);
        };
    }
  }
  protected afterResponse() {}
  protected save(): Promise<ResponseData<any>> {
    return Promise.resolve(this.response);
  }
  protected onErrorFailed(err) {
    //this.ToasterService.error(typeof err === 'string' ? err : JSON.stringify(err.));
    var error = typeof err === 'string' ? err : JSON.stringify(err?.error?.error?.message);
    if (error) this.ToasterService.error(error);

    this.Logger.error(err);
  }
  onSubmitSuccess(res: ResponseData<any>) {
    this.ToasterService.success('::msg_Save_Data_Successfully');
    this.restForm();
  }
  onSubmitFailed(res: ResponseData<any>) {
    this.ToasterService.error(res.firstErrorMessage);
  }
  protected getByParamsPromise<T>(item: T): Promise<ResponseData<any>> {
    return Promise.resolve(this.getByParamsResponse);
  }
  protected fillFormData(data) {
    this.form.patchValue(data);
    this.Logger.info('fillFormData', this.form.value);
  }
  protected onGetByParamsSuccess<E>(result: ResponseData<E>) {
    this.hideIntervalLoader();

    this.fillFormData(result.data);
  }
  protected onGetByParamsNotValid(result: ResponseData<any>) {
    this.ToasterService.error(result.firstErrorMessage);
  }
  protected getByParams<T, E>(item: T = null) {
    this.showIntervalLoader();
    this.getByParamsPromise(item).then(
      (res: ResponseData<E>) => {
        this.hideIntervalLoader();
        if (res.isValid) {
          this.Logger.info(' this.getByParams', res);
          this.hideIntervalLoader();

          this.onGetByParamsSuccess(res);
          this.afterAllDataLoaded();
        } else {
          this.onGetByParamsNotValid(res);
        }
      },
      err => {
        this.hideIntervalLoader();

        this.onErrorFailed(err);
      }
    ),
      err => {
        this.hideIntervalLoader();

        this.onErrorFailed(err);
      };
  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.ToasterService.clear();
  }
}
