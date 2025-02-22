import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { ResponseData } from '@proxy/domain/shared/common';
import { ExperimentDto, ExperimentService } from '@proxy/experiments';

import { firstValueFrom, Observable } from 'rxjs';

import { TableConfig, ActionType } from 'src/app/core/models/table-config-model';

import { ExperimentModalComponent } from './experiment-modal/experiment-modal.component';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class ExperimentComponent
  extends ListBaseComponent<ExperimentDto, PagedAndSortedResultRequestDto>
  implements OnInit
{
  get Service(): ExperimentService {
    return this.getByInjector(ExperimentService);
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
    var mod = this.ModalService.open(ExperimentModalComponent);
    mod.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
  }

  edit(item: any) {
    this.openModal(ExperimentModalComponent, {
      selectedExperiment: item,
      isEdit: true,
      experimentId: item.id,
    });
  }
}
