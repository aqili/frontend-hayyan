import { ListService, PagedAndSortedResultRequestDto } from '@abp/ng.core';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { BookDto } from '@proxy/books';

import { Observable, interval } from 'rxjs';

import {
  ActionType,
  ColumnTypeEnum,
  RowActionWithData,
  TableConfig,
} from 'src/app/core/models/table-config-model';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class TableViewComponent extends BaseComponent implements OnInit {
  @Input() tableData: any;
  @Input() totalCount: any;
  get ListService(): ListService {
    return this.getByInjector(ListService);
  }
  ColumnTypeEn = ColumnTypeEnum; // Add this line to make the enum available in the template

  @Input() tableConfig: TableConfig;
  @Output()
  startRowAction = new EventEmitter<{}>();
  ngOnInit() {
    super.ngOnInit();
  }

  onRowActionClicked(actionType: ActionType, rowData: any, otherFunction): void {
    const userAction: RowActionWithData<any> = {
      actionType: actionType,
      rowData: rowData,
      otherFunction: otherFunction,
    };
    this.startRowAction.emit(userAction);
  }
}
