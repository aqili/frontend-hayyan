import { ListService, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

import { ListBaseComponent } from '@base/listbase.component';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { BookService, BookDto, bookTypeOptions } from '@proxy/books';
import { ResponseData } from '@proxy/domain/shared/common';

import { Observable } from 'rxjs';

import { BooktModalComponent } from './bookt-modal/bookt-modal.component';

@Component({
  selector: 'app-bookt',
  templateUrl: './bookt.component.html',
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class BooktComponent
  extends ListBaseComponent<BookDto, PagedAndSortedResultRequestDto>
  implements OnInit
{
  get Service(): BookService {
    return this.getByInjector(BookService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
  getList(dto: any): Observable<any> {
    return this.Service.getList(dto);
  }

  onDelete(item) {
    this.getConfirmationWarnModal('delete', 'Delete book', () => {
      this.DeleteByParams(item.id);
    });
  }

  protected deleteByParamsPromise(item: any): Promise<ResponseData<boolean>> {
    return this.Service.delete(item).toPromise();
  }
  createBook() {
    var mod = this.ModalService.open(BooktModalComponent);
    mod.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
  }

  editBook(item) {
    var mod = this.ModalService.open(BooktModalComponent);
    mod.componentInstance.afterCloseModal = () => {
      this.refreshData();
    };
    mod.componentInstance.selectedBook = item;
    mod.componentInstance.isEdit = true;
    mod.componentInstance.bookId = item.id;
  }
}
