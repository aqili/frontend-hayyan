import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';
import { GroupDto, GroupService } from '@proxy/groups';

import { firstValueFrom, Observable } from 'rxjs';

import {
  TableConfig,
  ActionType,
  FilterOptionTypeEnum,
} from 'src/app/core/models/table-config-model';

import { GroupModalComponent } from './group-modal/group-modal.component';
import { StudentService } from '@proxy/services';
import { StudntDto } from '@proxy/users';
import { ListSearchDto } from '@proxy/common';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class GroupComponent extends ListBaseComponent<GroupDto, ListSearchDto> implements OnInit {
  students: StudntDto[] = [];
  get Service(): GroupService {
    return this.getByInjector(GroupService);
  }

  get studentService(): StudentService {
    return this.getByInjector(StudentService);
  }
  tableConfig: TableConfig = {
    columns: [
      {
        title: 'Name',
        dataProperty: 'name',
        type: this.ColumnTypeEnum.Text,
      },
      {
        title: 'Description',
        dataProperty: 'description',
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
    ],
    rowsPerPage: 15,
    searchColumnFilter: [
      {
        displayName: 'Name',
        name: 'Name',
        filterOptionType: FilterOptionTypeEnum.Text,
      },
      {
        displayName: 'Course Name',
        name: 'CourseInstractorGroups.Course.Name',
        filterOptionType: FilterOptionTypeEnum.Text,
      },
    ],
  };
  ngOnInit() {
    super.ngOnInit();
    this.getStudentList();
  }
  getList(dto: any): Observable<any> {
    return this.Service.getList(dto);
  }
  getStudentList() {
    return this.studentService.getAllStudents().subscribe(s => (this.students = s));
  }
  protected deleteByParamsPromise(item: any): Promise<ResponseData<boolean>> {
    return firstValueFrom(this.Service.delete(item));
  }
  add() {
    var mod = this.ModalService.open(GroupModalComponent);
    mod.componentInstance.students = this.students;
    mod.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
  }

  edit(item: any) {
    this.openModal(GroupModalComponent, {
      selectedGroup: item,
      isEdit: true,
      groupId: item.id,
      students: this.students,
    });
  }
}
