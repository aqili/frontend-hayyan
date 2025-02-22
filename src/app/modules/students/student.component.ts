import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';
import { StudentService } from '@proxy/services';
import { UserDto } from '@proxy/users';

import { firstValueFrom, Observable } from 'rxjs';

import { TableConfig, ActionType, ColumnTypeEnum } from 'src/app/core/models/table-config-model';

import { StudentModalComponent } from './student-modal/student-modal.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class StudentComponent
  extends ListBaseComponent<UserDto, PagedAndSortedResultRequestDto>
  implements OnInit
{
  get Service(): StudentService {
    return this.getByInjector(StudentService);
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
    pathExampleExcel: 'assets/excel/student.xlsx',
    uploadExcelApi: '/api/app/student/upload-excel-user',
  };
  ngOnInit() {
    super.ngOnInit();
  }
  getList(dto: any): Observable<any> {
    return this.Service.list(dto);
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
    var mod = this.ModalService.open(StudentModalComponent);
    mod.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
  }

  edit(item: any) {
    this.openModal(StudentModalComponent, {
      selectedStudent: item,
      isEdit: true,
      studentId: item.id,
    });
  }
}
