import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';

import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LocalizationParam, LocalizationService } from '@abp/ng.core';

import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationService } from '@shared/service/notification.service';
import { UserService } from '@shared/service/user.service';
import { EncryptDecrService } from '@shared/service/encr-decr.service ';
import { GetConfigService } from '@shared/service/get-confg.service';
import { CustomNgbDatepickerHijri } from '@shared/service/custom-ngb-datepicker.service';

import { NGXLogger } from 'ngx-logger';

import { Shell } from '../../shell';
import { CustomAuthService } from '../../service/custom-auth.service';
import { LoaderService } from '../../service/loader.service';
import { MyAttachmentsService } from '../add-attachment/types/my.attachments.service';
import { ActionType, ColumnTypeEnum } from 'src/app/core/models/table-config-model';

@Component({
  template: ``,
})
/* @AutoUnsub()
 */
export abstract class BaseComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    clearInterval(this.setIntervalid);
    this.ToasterService.clear();
  }
  form: FormGroup;
  get IsArabic(): boolean {
    return this.LocalizationService.currentLang == 'ar';
  }
  get ConfirmationService(): ConfirmationService {
    return this.getByInjector(ConfirmationService);
  }
  get getConfigService(): GetConfigService {
    return this.getByInjector(GetConfigService);
  }
  get IsLoggedInUser(): boolean {
    return this.CustomAuthService.hasValidAccessToken();
  }
  get CurrentUserId(): string {
    return this.UserService.getCurrentUser().id;
  }
  get CurrentUserEmail(): string {
    return this.UserService.getCurrentUser().email;
  }
  get CurrentUserName(): string {
    return this.UserService.getCurrentUser().name;
  }
  get CurrentUserPhoneNumber(): string {
    return this.UserService.getCurrentUser().phoneNumber;
  }
  get CurrentUserType(): any {
    return null;
  }
  get FormBuilder(): FormBuilder {
    return this.getByInjector(FormBuilder);
  }
  get ModalService(): NgbModal {
    return Shell.injector.get(NgbModal);
  }
  get Location(): Location {
    return Shell.injector.get(Location);
  }
  get myAttachmentsService(): MyAttachmentsService {
    return Shell.injector.get(MyAttachmentsService);
  }
  get LocalizationService(): LocalizationService {
    return Shell.injector.get(LocalizationService);
  }
  get ToasterService(): ToasterService {
    return Shell.injector.get(ToasterService);
  }
  get NgbCalendar(): NgbCalendar {
    return this.getByInjector(NgbCalendar);
  }

  get NgbCalendarHijri(): CustomNgbDatepickerHijri {
    return this.getByInjector(CustomNgbDatepickerHijri);
  }

  get Logger(): NGXLogger {
    return Shell.injector.get(NGXLogger);
  }
  get LoaderService(): LoaderService {
    return Shell.injector.get(LoaderService);
  }
  get Router(): Router {
    return Shell.injector.get(Router);
  }
  get ColumnTypeEnum(): typeof ColumnTypeEnum {
    return ColumnTypeEnum;
  }
  get ActionType(): typeof ActionType {
    return ActionType;
  }
  get ActivatedRoute(): ActivatedRoute {
    return Shell.injector.get(ActivatedRoute);
  }
  get CustomAuthService(): CustomAuthService {
    return Shell.injector.get(CustomAuthService);
  }
  get UserService(): UserService {
    return Shell.injector.get(UserService);
  }
  get EncryptDecrService(): EncryptDecrService {
    return Shell.injector.get(EncryptDecrService);
  }
  get NotificationService(): NotificationService {
    return this.getByInjector(NotificationService);
  }
  get ComponentName(): string {
    return this.constructor.name;
  }
  ngOnInit(): void {
    this.onEnterOnInit();
    this.buildForm();
    this.onFinishOnInit();
  }
  goToHome() {
    this.Router.navigateByUrl('/');
  }
  trackById = (index, item) => item.id;

  protected onFinishOnInit() {}
  protected onEnterOnInit() {}
  protected buildForm() {}
  protected conditionalValidator(
    predicate: () => boolean,
    validator: ValidatorFn,
    errorNamespace?: string
  ) {
    return formControl => {
      if (!formControl.parent) {
        return null;
      }
      let error = null;

      if (predicate()) {
        error = validator(formControl);
      }
      if (errorNamespace && error) {
        const customError = {};
        customError[errorNamespace] = error;
        error = customError;
      }

      return error;
    };
  }
  protected getByInjector<T>(service: T) {
    return Shell.injector.get(service);
  }
  protected isEmpty(str) {
    return str == null || !str || str + ''.trim().length === 0;
  }
  protected getEnumNameByValue(enumName, value, enumneamstr?: string) {
    return 'enum_' + enumneamstr + '_' + enumName[value];
  }
  equals(one: NgbDateStruct, two: NgbDateStruct) {
    return one && two && two.year === one.year && two.month === one.month && two.day === one.day;
  }
  isInside(date, fromDate, toDate) {
    return this.after(date, fromDate) && this.before(date, toDate);
  }

  before(one: NgbDateStruct, two: NgbDateStruct): boolean {
    return !one || !two
      ? false
      : one.year === two.year
      ? one.month === two.month
        ? one.day === two.day
          ? false
          : one.day < two.day
        : one.month < two.month
      : one.year < two.year;
  }
  get resolver(): ComponentFactoryResolver {
    return this.getByInjector(ComponentFactoryResolver);
  }
  after(one: NgbDateStruct, two: NgbDateStruct): boolean {
    return !one || !two
      ? false
      : one.year === two.year
      ? one.month === two.month
        ? one.day === two.day
          ? false
          : one.day > two.day
        : one.month > two.month
      : one.year > two.year;
  }

  getComponentInstance(comp) {
    const factory = this.resolver.resolveComponentFactory(comp);

    const componentRef = factory.create(Shell.injector);
    return componentRef.instance;
  }
  updateValueAndValidityForm() {
    this.form?.updateValueAndValidity();
    Object.keys(this.form?.controls).forEach(key => {
      this.form?.controls[key].updateValueAndValidity();
    });
  }
  getLocalizeStr(ar, en) {
    return this.IsArabic ? (this.isEmpty(ar) ? en : ar) : this.isEmpty(en) ? ar : en;
  }
  restForm() {
    this.form?.reset();
    this.form?.updateValueAndValidity();
    this.form?.setErrors(null);
  }
  ConvertEnumToList(enumName: any, enumneamstr?: string) {
    const arrayObjects = [];

    for (const [propertyKey, propertyValue] of Object.entries(enumName)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({
        id: propertyValue,
        name: enumneamstr ? 'enum_' + enumneamstr + '_' + propertyKey : propertyKey,
      });
    }

    return arrayObjects;
  }
  setIntervalid: any;

  showIntervalLoader() {
    this.setIntervalid = setInterval(() => {
      this.LoaderService.show();
    }, 30);
  }
  hideIntervalLoader() {
    if (this.setIntervalid) {
      clearInterval(this.setIntervalid);
      this.LoaderService.hide();
    }
  }
  EncryptQueryById(id, canCodedUri = false) {
    var textToConvert = JSON.stringify({ id: id });
    if (canCodedUri) return encodeURIComponent(this.EncryptDecrService.set(textToConvert));
    else return this.EncryptDecrService.set(textToConvert);
  }
  getConfirmationWarnModal(
    message: LocalizationParam,
    title: LocalizationParam,
    successCallback: () => void,
    options?: Partial<Confirmation.Options>
  ) {
    this.ConfirmationService.warn(message, title, options).subscribe(
      (status: Confirmation.Status) => {
        if (status == Confirmation.Status.confirm) {
          successCallback();
        }
      }
    );
  }
  protected onErrorFailed(err) {
    this.ToasterService.error(
      typeof err === 'string' ? err : JSON.stringify(err?.error?.error?.message)
    );
    // this.ToasterService.error(typeof err === 'string' ? err : JSON.stringify(err));
    this.Logger.error(err);
  }
  EncryptQuery(data, canCodedUri = false) {
    var textToConvert = JSON.stringify(data);
    if (canCodedUri) return encodeURIComponent(this.EncryptDecrService.set(textToConvert));
    else return this.EncryptDecrService.set(textToConvert);
  }

  getDecrepitQuery(encrypted) {
    var res = this.EncryptDecrService.get(encrypted);
    return res;
  }
  public encodeURL(url) {
    return encodeURIComponent(url);
  }
  protected readeStringParameters(isCheck = true, canDecodedUrl = false) {
    const query = this.ActivatedRoute.snapshot.queryParams.query;
    if (!query) {
      if (isCheck) {
        if (this.Location) {
          this.Location.back();
        } else {
          this.Router.navigate(['/']);
        }
      }
      return;
    } else if (!query) {
      return;
    }
    let val = null;
    if (canDecodedUrl) val = this.getDecrepitQuery(decodeURIComponent(query));
    else val = this.getDecrepitQuery(query);

    const queryParams = val;
    if (queryParams) {
      return queryParams as any;
    }
    if (isCheck) {
      if (this.Location) {
        this.Location.back();
      } else {
        this.Router.navigate(['/']);
      }
    }
  }
  protected encryptAndDecrepitStringRoutParams(
    parms: string[],
    isCheck = true,
    activatedRoute: ActivatedRoute = null,
    canDecodedUrl = true
  ): { decrepitValues: any; encryptedValues } {
    var res = {};
    let query = null;
    if (Object.values(this.ActivatedRoute.snapshot.params).length > 0)
      query = this.ActivatedRoute.snapshot.params;
    else query = activatedRoute.snapshot.params;

    if (!query) {
      if (isCheck) {
        if (this.Location) {
          this.Location.back();
        } else {
          this.Router.navigate(['/']);
        }
      }
      return;
    } else if (!query) {
      return;
    }
    let queryParams = {};
    let deParams = {};

    parms.forEach(element => {
      let val = null;
      if (canDecodedUrl) val = this.getDecrepitQuery(decodeURIComponent(query[element]));
      else val = this.getDecrepitQuery(query[element]);

      queryParams[element] = val;
      deParams[element] = query[element];
    });
    if (queryParams) {
      res['decrepitValues'] = queryParams;
      res['encryptedValues'] = deParams;

      return res as any;
    }
    if (isCheck) {
      if (this.Location) {
        this.Location.back();
      } else {
        this.Router.navigate(['/']);
      }
    }
  }
  navigateToRouteByEncryptedId(route: string, id: any) {
    this.Router.navigate([route], {
      relativeTo: this.ActivatedRoute,
      queryParams: { query: this.EncryptQueryById(id) },
    });
  }
  navigateToRouteByEncrypted(route: string, queryParams: any) {
    this.Router.navigate([route], {
      relativeTo: this.ActivatedRoute,
      queryParams: { query: this.EncryptQuery(queryParams) },
    });
  }
}
function AutoUnsub() {
  return function (constructor) {
    const orig = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (const prop in this) {
        const property = this[prop];
        if (typeof property.subscribe === 'function') {
          property.unsubscribe();
        }
      }
      orig.apply();
    };
  };
}
