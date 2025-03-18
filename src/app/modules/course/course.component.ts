import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';
import { CourseDto, CourseService } from '@proxy/courses';
import { ExperimentDto, ExperimentService } from '@proxy/experiments';
import { ListSearchDto } from '@proxy/common';

import { firstValueFrom, Observable } from 'rxjs';

import {
  TableConfig,
  ActionType,
  FilterOptionTypeEnum,
} from 'src/app/core/models/table-config-model';

import { CourseModalComponent } from './course-modal/course-modal.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class CourseComponent extends ListBaseComponent<CourseDto, ListSearchDto> implements OnInit {
  get Service(): CourseService {
    return this.getByInjector(CourseService);
  }

  tableConfig: TableConfig = {
    columns: [
      {
        title: 'Name',
        dataProperty: 'name',
      },
      {
        title: 'StartDate',
        dataProperty: 'startDate',
        type: this.ColumnTypeEnum.DateOnly,
      },
      {
        title: 'EndDate',
        dataProperty: 'endDate',
        type: this.ColumnTypeEnum.DateOnly,
      },
      {
        title: 'IsActive',
        dataProperty: 'isActive',
        type: this.ColumnTypeEnum.CheckBox,
      },
      {
        title: 'GroupsCount',
        dataProperty: 'groupsCount',
      },
      {
        title: 'ExperimentsCount',
        dataProperty: 'experimentsCount',
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
        displayName: 'Group Name',
        name: 'CourseInstractorGroups.Group.Name',
        filterOptionType: FilterOptionTypeEnum.Text,
      },
    ],
  };
  ngOnInit() {
    super.ngOnInit();
  }

  getList(dto: any): Observable<any> {
    return this.Service.getList(dto);
  }

  protected deleteByParamsPromise(item: any): Promise<ResponseData<boolean>> {
    return firstValueFrom(this.Service.delete(item));
  }
  add() {
    this.openModal(CourseModalComponent);
  }

  edit(item: any) {
    this.openModal(CourseModalComponent, {
      selectedCourse: item,
      isEdit: true,
      courseId: item.id,
    });
  }
}
