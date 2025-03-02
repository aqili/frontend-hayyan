
export interface AttachmentOutPutDto {
  attachmentId: number;
  fileName?: string;
  content: number[];
  contentType?: string;
  extension?: string;
  isParent: any;
}

export interface AttachmentResponseDto {
  attachmentId: number;
  fileName?: string;
  content: number[];
  contentType?: string;
  extension?: string;
  isParent: any;
}

export interface ListAttachmentOutPutDto {
  attachmentListDto: AttachmentOutPutDto[];
}

export interface ListAttachmentResponseDto {
  attachmentListDto: AttachmentResponseDto[];
}
