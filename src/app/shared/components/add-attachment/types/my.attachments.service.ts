/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpEvent,
  HttpParams,
  HttpParameterCodec,
} from '@angular/common/http';

import { ConfigStateService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';

import { AttachmentService } from '@proxy/attachments';

import { Observable, Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyAttachmentsService {
  apiName = 'Default';
  rootUrl = '';
  constructor(
    protected http: HttpClient,
    private attachmentsService: AttachmentService,
    private toasterService: ToasterService
  ) {
    this.rootUrl = environment.apis.default.url;
  }

  protected newParams(): HttpParams {
    return new HttpParams({
      encoder: PARAMETER_CODEC,
    });
  }
  downloadAttachmentById(attachmentId) {
    if (attachmentId > 0) {
      this.attachmentsService.downloadFile(attachmentId).subscribe(res => {
        if (res.isValid) {
          this.download(res.data.content, res.data.fileName, res.data.contentType);
        } else {
          this.toasterService.error(res.firstErrorMessage);
        }
      });
    }
  }

  download(content, name, contentType) {
    const linkSource = 'data:' + contentType + ';base64,' + content;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = name;
    downloadLink.click();
  }
  uploadAttachments(formData: FormData, attachmentTypeId): Observable<HttpEvent<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();

    // let __headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data', accept: 'text/plain' });

    let __body: any = null;
    let __formData = formData;
    __body = __formData; //{files:__formData,attachmentTypeId:attachmentTypeId};
    if (attachmentTypeId != null)
      __params = __params.set('attachmentTypeId', attachmentTypeId.toString());

    let req = new HttpRequest<any>(
      'POST',
      // this.rootUrl + '/api/app/attachment/upload-files',
      this.rootUrl + '/api/app/attachment/upload-files/' + attachmentTypeId.toString(),
      __body,
      {
        headers: __headers,
        // params: __params,
        responseType: 'json',
        reportProgress: true,
        observe: 'events',
      } as any
    );
    let obser$ = this.http.request<any>(req);
    return obser$;
  }

  uploadExcel(formData: FormData, apiUrl: string): Observable<HttpEvent<any>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();

    // let __headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data', accept: 'text/plain' });

    let __body: any = null;
    let __formData = formData;
    __body = __formData; //{files:__formData,attachmentTypeId:attachmentTypeId};

    let req = new HttpRequest<any>(
      'POST',
      // this.rootUrl + '/api/app/attachment/upload-files',
      this.rootUrl + apiUrl,
      __body,
      {
        headers: __headers,
        // params: __params,
        responseType: 'json',
        reportProgress: true,
        observe: 'events',
      } as any
    );
    let obser$ = this.http.request<any>(req);
    return obser$;
  }
}

class ParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
const PARAMETER_CODEC = new ParameterCodec();
