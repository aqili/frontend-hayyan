import type { AttachmentResponseDto, ListAttachmentOutPutDto, ListAttachmentResponseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseData } from '../domain/shared/common/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  apiName = 'Default';
  

  deleteFiles = (attachmentId: number, cancellationToken: any, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ListAttachmentResponseDto>>({
      method: 'DELETE',
      url: `/api/app/attachment/files/${attachmentId}`,
    },
    { apiName: this.apiName,...config });
  

  downloadFile = (attachmentId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<AttachmentResponseDto>>({
      method: 'POST',
      url: `/api/app/attachment/download-file/${attachmentId}`,
    },
    { apiName: this.apiName,...config });
  

  downloadFiles = (attachmentId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ListAttachmentResponseDto>>({
      method: 'POST',
      url: `/api/app/attachment/download-files/${attachmentId}`,
    },
    { apiName: this.apiName,...config });
  

  uploadFiles = (files: IFormFile[], attachmentTypeId: number, cancellationToken: any, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseData<ListAttachmentOutPutDto>>({
      method: 'POST',
      url: `/api/app/attachment/upload-files/${attachmentTypeId}`,
      body: files,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
