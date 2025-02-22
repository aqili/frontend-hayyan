import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';
import { UserDto } from '@proxy/users';
import { InstractorService } from '@proxy/services';

import { firstValueFrom, Observable } from 'rxjs';

import { TableConfig, ActionType, ColumnTypeEnum } from 'src/app/core/models/table-config-model';

import { InstructorModalComponent } from './instructor-modal/instructor-modal.component';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class InstructorComponent
  extends ListBaseComponent<UserDto, PagedAndSortedResultRequestDto>
  implements OnInit
{
  get Service(): InstractorService {
    return this.getByInjector(InstractorService);
  }
  tableConfig: TableConfig = {
    columns: [
      {
        title: 'FirstName',
        dataProperty: 'firstName',
      },
      {
        title: 'LastName',
        dataProperty: 'lastName',
      },
      {
        title: 'Telephone',
        dataProperty: 'telephone',
      },
      {
        title: 'Email',
        dataProperty: 'email',
      },
      {
        title: 'Active',
        dataProperty: 'isActive',
        type: ColumnTypeEnum.CheckBox,
      },
    ],
    rowActions: [
      {
        label: 'Edit',
        showOption: x => true,
        actionType: ActionType.Edit,
        className: 'primary3',
      },
      {
        label: 'Delete',
        showOption: x => true,
        actionType: ActionType.Delete,
        className: 'red',
      },
      {
        label: 'Active',
        showOption: x => x.isActive == false,
        actionType: ActionType.Other,
        className: 'red',
        otherFunction: x => this.onActive(x),
      },
      {
        label: 'InActive',
        showOption: x => x.isActive,
        actionType: ActionType.Other,
        className: 'red',
        otherFunction: x => this.onInActive(x),
      },
    ],
    rowsPerPage: 15,
    pathExampleExcel: 'assets/excel/instructor.xlsx',
    uploadExcelApi: '/api/app/instractor/upload-excel-user',
  };
  ngOnInit() {
    super.ngOnInit();
  }
  getList(dto: any): Observable<any> {
    return this.Service.getInstractorList(dto);
  }

  protected deleteByParamsPromise(item: any): Promise<ResponseData<boolean>> {
    return firstValueFrom(this.Service.delete(item));
  }
  protected ActiveByParamsPromise(item: any): Promise<ResponseData<boolean>> {
    return firstValueFrom(this.Service.activate(item));
  }
  protected InActiveByParamsPromise(item: any): Promise<ResponseData<boolean>> {
    return firstValueFrom(this.Service.deActivate(item));
  }
  add() {
    var mod = this.ModalService.open(InstructorModalComponent);
    mod.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
  }

  edit(item: any) {
    this.openModal(InstructorModalComponent, {
      selectedInstructor: item,
      isEdit: true,
      instructorId: item.id,
    });
  }
}
