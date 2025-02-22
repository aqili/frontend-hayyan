import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse
} from "@angular/common/http";

import { LoaderService } from "@shared/service/loader.service";

import { delay, tap } from "rxjs/operators";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private _loaderService: LoaderService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this._loaderService.show();
    return next.handle(request).pipe(
      tap(
        req => {
          if (req instanceof HttpResponse) {
            delay(3000),
            this._loaderService.hide();
          }
        },
        err => {
          delay(3000),
          this._loaderService.hide();
        }
      )
    );
  }
}
