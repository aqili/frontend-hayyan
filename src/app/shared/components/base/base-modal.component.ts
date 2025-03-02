import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';

import { EditBaseComponent } from './editbase.component';

@Component({
  template: ``,
})
export abstract class BaseModalComponent
  extends EditBaseComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  ngAfterViewInit(): void {
    this.config.backdrop = 'static';
  }

  @Output() readonly modelClosed = new EventEmitter<void>();
  get config(): NgbModalConfig {
    return this.getByInjector(NgbModalConfig);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.config.backdrop = 'static';
    this.ToasterService.clear();
  }

  inProgress: boolean;
  suppressUnsavedChangesWarning = false;
  isModalStatusOpen: boolean = true;
  onCloseModel() {
    this.ModalService.dismissAll();
    this.restForm();
    this.afterCloseModal();
    this.modelClosed.emit();
    this.ToasterService.clear();
  }
  protected beforeSave(): void {
    this.LoaderService.show();
  }
  protected afterResponse(): void {}
  afterCloseModal(): void {}
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.ToasterService.clear();
  }
  onSubmitSuccess(res: ResponseData<any>) {
    super.onSubmitSuccess(res);
    this.isModalStatusOpen = false;
  }
}
