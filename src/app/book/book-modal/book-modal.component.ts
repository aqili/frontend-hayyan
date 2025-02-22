import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseModalComponent } from '@base/base-modal.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { BookDto, bookTypeOptions } from '@proxy/books';

import { firstValueFrom } from 'rxjs';

import { BookService } from '../../proxy/books/book.service';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
})
export class BookModalComponent extends BaseModalComponent implements OnInit {
  get Service(): BookService {
    return this.getByInjector(BookService);
  }
  bookId = null;
  selectedBook = {} as BookDto; // reset the selected book
  bookTypes = bookTypeOptions;
  isEdit = false;

  ngOnInit(): void {
    console.log('BookModalComponent ngOnInit', bookTypeOptions);

    super.ngOnInit();
    if (this.bookId) this.getByParams(this.bookId);
  }
  protected buildForm(): void {
    this.form = this.FormBuilder.group({
      name: ['', Validators.required],
      type: [null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null,
        Validators.required,
      ],
      price: [null, Validators.required],
    });
  }
  // protected save(): Promise<ResponseData<BookDto>> {
  //   if (this.isEdit) {
  //     return this.Service.update(this.selectedBook.id, this.form.getRawValue()).toPromise();
  //   }
  //   return this.Service.create(this.form.getRawValue()).toPromise();
  // }
  protected getByParamsPromise(item: any): Promise<ResponseData<any>> {
    return firstValueFrom(this.Service.get(item));
  }
}
