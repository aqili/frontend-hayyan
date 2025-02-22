import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { BookService, BookDto, bookTypeOptions } from '@proxy/books';
import { ResponseData } from '@proxy/domain/shared/common';

import { firstValueFrom, Observable } from 'rxjs';

import { ActionType, RowActionWithData, TableConfig } from '../core/models/table-config-model';

import { BookModalComponent } from './book-modal/book-modal.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class BookComponent
  extends ListBaseComponent<BookDto, PagedAndSortedResultRequestDto>
  implements OnInit
{
  get Service(): BookService {
    return this.getByInjector(BookService);
  }
  tableConfig: TableConfig = {
    columns: [
      {
        title: 'Name',
        dataProperty: 'name',
      },
      {
        title: 'Type',
        dataProperty: 'type',
      },
      {
        title: 'Price',
        dataProperty: 'price',
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
    var mod = this.ModalService.open(BookModalComponent);
    mod.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
  }

  edit(item: any) {
    this.openModal(BookModalComponent, {
      selectedBook: item,
      isEdit: true,
      bookId: item.id,
    });
  }
}
