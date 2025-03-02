import type { BookType } from './book-type.enum';

export interface BookDto {
  name?: string;
  type: BookType;
  publishDate?: string;
  price: number;
}

export interface CreateUpdateBookDto {
  name: string;
  type: BookType;
  publishDate: string;
  price: number;
}
