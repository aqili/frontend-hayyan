import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';
import { UserDto } from '@proxy/users';
import { InstractorService } from '@proxy/services';
import { ListSearchDto } from '@proxy/common';

import { firstValueFrom, Observable } from 'rxjs';

import {
  TableConfig,
  ActionType,
  ColumnTypeEnum,
  FilterOptionTypeEnum,
} from 'src/app/core/models/table-config-model';

import { InstructorModalComponent } from './instructor-modal/instructor-modal.component';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class InstructorComponent
  extends ListBaseComponent<UserDto, ListSearchDto>
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
      {
        label: 'SendActiveEmail',
        showOption: x => true,
        actionType: ActionType.Other,
        className: 'red',
        otherFunction: x => this.sendActiveEmail(x),
      },
    ],
    rowsPerPage: 15,
    pathExampleExcel: 'assets/excel/instructor.xlsx',
    uploadExcelApi: '/api/app/instractor/upload-excel-user',
    searchColumnFilter: [
      {
        displayName: this.LocalizationService.instant('::Name'),
        name: 'FirstName',
        filterOptionType: FilterOptionTypeEnum.Text,
      },
      {
        displayName: this.LocalizationService.instant('::Email'),
        name: 'Email',
        filterOptionType: FilterOptionTypeEnum.Text,
      },
      {
        displayName: this.LocalizationService.instant('::CourseName'),
        name: 'CourseInstractorGroups.Course.Name',
        filterOptionType: FilterOptionTypeEnum.Text,
      },
      {
        displayName: this.LocalizationService.instant('::GroupName'),
        name: 'CourseInstractorGroups.Group.Name',
        filterOptionType: FilterOptionTypeEnum.Text,
      },
    ],
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
  protected InSendActiveByParamsPromise(item: any): Promise<ResponseData<boolean>> {
    return firstValueFrom(this.Service.sendActiveEmailById(item));
  }
  add() {
    var mod = this.ModalService.open(InstructorModalComponent, {
      size: 'lg', // Options: 'sm', 'md' (default), 'lg', 'xl'
      // fullscreen: true,
      windowClass: 'custom-modal-class'
    });
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
