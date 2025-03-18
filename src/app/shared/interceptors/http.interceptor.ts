import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, filter, finalize } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

import { LoaderService } from '../service/loader.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public loaderService:LoaderService,private logger: NGXLogger) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add custom header
    const customReq = request.clone({});
    //this.logger.info('processing request', customReq);
this.loaderService.show();
    // pass on the modified request object
    return next.handle(customReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone();
          //this.logger.info('processing response', event);
          this.loaderService.hide();

        }
        this.loaderService.hide();

        return event;
      }),
      catchError(response => {
        this.loaderService.hide();

        if (response instanceof HttpErrorResponse) {
          //this.logger.error('processing http error', response);
        }
        this.loaderService.hide();

        return throwError(response);
      }),
      finalize(() => this.loaderService.hide()));
  }
}
