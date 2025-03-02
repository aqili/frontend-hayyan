import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { ToasterService } from '@abp/ng.theme.shared';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { LoaderService } from '../service/loader.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(
    public loaderService: LoaderService,
    private logger: NGXLogger,
    private toasterService: ToasterService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        this.logger.error(error);

        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          this.logger.error('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else if (error.status === 0) {
          this.toasterService.error('حدث خطأ');
          this.loaderService.hide();

          throwError(error);
          return;
        } else {
          this.logger.error('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        this.logger.error(errorMsg);

        return throwError(error);
      })
    );
  }
}
