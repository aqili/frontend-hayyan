import { ListService } from '@abp/ng.core';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';
import { ListSearchDto } from '@proxy/common';

import { Observable } from 'rxjs';

import { RowActionWithData, ActionType } from 'src/app/core/models/table-config-model';

import { BaseComponent } from './base.component';

@Component({
  template: ``,
})
export abstract class ListBaseComponent<T, S extends ListSearchDto>
  extends BaseComponent
  implements OnInit, OnDestroy
{
  someFilterValue: S = {} as S;
  abstract get Service(): any;
  private deleteByParamsResponse: ResponseData<any>;

  items?: T[] | any[];
  totalCount?: number;
  get ListService(): ListService {
    return this.getByInjector(ListService);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.getData();
  }
  project: Observable<any>;

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.someFilterValue = {} as S;
    this.ListService.page = 0;
    this.ListService.ngOnDestroy();
  }
  getData() {
    const dataStreamCreator = query => {
      return this.getList({ ...query, ...this.someFilterValue });
    };
    this.showIntervalLoader();
    this.ListService.hookToQuery(dataStreamCreator).subscribe(
      response => {
        this.hideIntervalLoader();
        this.items = response.items;
        this.totalCount = response.totalCount;
      },
      err => {
        this.hideIntervalLoader();

        this.onErrorFailed(err);
      },
    );
  }
  getList(dto): Observable<any> {
    return this.project;
  }
  refreshData() {
    this.showIntervalLoader();
    this.ListService.get();
    this.hideIntervalLoader();
  }
  onPageChange($event) {
    this.showIntervalLoader();

    window.scroll(0, 0);
    this.ListService.page = $event - 1;
  }
  rowActions(ev: RowActionWithData<any>) {
    console.log('ev', ev);
    if (ev.actionType === ActionType.Edit) {
      this.edit(ev.rowData);
    } else if (ev.actionType === ActionType.Delete) {
      this.onDelete(ev.rowData);
    } else if (ev.actionType === ActionType.Add) {
      this.add();
    } else if (ev.actionType === ActionType.Other) {
      if (ev.otherFunction) ev.otherFunction(ev.rowData);
    } else if (ev.actionType === ActionType.ExcelResponse) {
      this.refreshData();
    }
  }

  protected edit(item) {}

  protected add() {}
  onDelete(item) {
    this.getConfirmationWarnModal('delete', 'Delete', () => {
      this.DeleteByParams(item.id);
    });
  }
  onActive(item) {
    this.getConfirmationWarnModal('Active', 'Active', () => {
      this.ActiveByParams(item.id);
    });
  }

  onInActive(item) {
    this.getConfirmationWarnModal('InActive', 'InActive', () => {
      this.InActiveByParams(item.id);
    });
  }
  sendActiveEmail(item) {
    this.getConfirmationWarnModal('Send Active Email ?', 'Active Email', () => {
      this.InSendActiveByParams(item.id);
    });
  }
  openModal(component: any, data?: any, options: NgbModalOptions = { size: 'xl' }) {
    const modalRef = this.ModalService.open(component, options);
    // Set the component instance data

    if (data) Object.assign(modalRef.componentInstance, data);

    modalRef.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
  }
  protected deleteByParamsPromise<T>(item: T): Promise<ResponseData<any>> {
    return Promise.resolve(this.deleteByParamsResponse);
  }
  protected ActiveByParamsPromise<T>(item: T): Promise<ResponseData<any>> {
    return Promise.resolve(this.deleteByParamsResponse);
  }
  protected InActiveByParamsPromise<T>(item: T): Promise<ResponseData<any>> {
    return Promise.resolve(this.deleteByParamsResponse);
  }
  protected InSendActiveByParamsPromise<T>(item: T): Promise<ResponseData<any>> {
    return Promise.resolve(this.deleteByParamsResponse);
  }
  protected onDeleteByParamsSuccess<E>(result: ResponseData<E>) {
    this.ListService.get();
    this.hideIntervalLoader();
  }
  protected onActiveByParamsPromise<E>(result: ResponseData<E>) {
    this.ListService.get();
    this.hideIntervalLoader();
  }
  protected onInActiveByParamsPromise<E>(result: ResponseData<E>) {
    this.ListService.get();
    this.hideIntervalLoader();
  }
  protected onSendActiveByParamsPromise<E>(result: ResponseData<E>) {
    this.ListService.get();
    this.hideIntervalLoader();
  }
  protected onDeleteByParamsNotValid(result: ResponseData<any>) {
    this.ToasterService.error(result.firstErrorMessage);
  }
  protected DeleteByParams<T, E>(item: T = null) {
    this.showIntervalLoader();
    this.deleteByParamsPromise(item).then(
      (res: ResponseData<E>) => {
        this.hideIntervalLoader();
        if (res.isValid) {
          this.Logger.info(' this.DeleteByParams', res);
          this.hideIntervalLoader();

          this.onDeleteByParamsSuccess(res);
        } else {
          this.onDeleteByParamsNotValid(res);
        }
      },
      err => {
        this.hideIntervalLoader();

        this.onErrorFailed(err);
      },
    );
  }
  protected ActiveByParams<T, E>(item: T = null) {
    this.showIntervalLoader();
    this.ActiveByParamsPromise(item).then(
      (res: ResponseData<E>) => {
        this.hideIntervalLoader();
        if (res.isValid) {
          this.Logger.info(' this.ActiveByParams', res);
          this.hideIntervalLoader();

          this.onDeleteByParamsSuccess(res);
        } else {
          this.onDeleteByParamsNotValid(res);
        }
      },
      err => {
        this.hideIntervalLoader();

        this.onErrorFailed(err);
      },
    );
  }
  protected InActiveByParams<T, E>(item: T = null) {
    this.showIntervalLoader();
    this.InActiveByParamsPromise(item).then(
      (res: ResponseData<E>) => {
        this.hideIntervalLoader();
        if (res.isValid) {
          this.Logger.info(' this.InActiveByParams', res);
          this.hideIntervalLoader();

          this.onDeleteByParamsSuccess(res);
        } else {
          this.onDeleteByParamsNotValid(res);
        }
      },
      err => {
        this.hideIntervalLoader();

        this.onErrorFailed(err);
      },
    );
  }
  protected InSendActiveByParams<T, E>(item: T = null) {
    this.showIntervalLoader();
    this.InSendActiveByParamsPromise(item).then(
      (res: ResponseData<E>) => {
        this.hideIntervalLoader();
        if (res.isValid) {
          this.Logger.info(' this.InActiveByParams', res);
          this.hideIntervalLoader();

          this.onDeleteByParamsSuccess(res);
        } else {
          this.onDeleteByParamsNotValid(res);
        }
      },
      err => {
        this.hideIntervalLoader();

        this.onErrorFailed(err);
      },
    );
  }

  onSearch(event) {
    if (!this.isEmpty(event?.columnValue) && !this.isEmpty(event?.columnName)) {
      this.someFilterValue = Object.assign({}, this.someFilterValue, {
        columnName: event.columnName,
        columnValue: event.columnValue,
      });

      this.ListService.page = 0;
      this.refreshData();
    }
  }
}
