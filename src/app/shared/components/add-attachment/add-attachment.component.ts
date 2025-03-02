import { HttpEventType } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

import { AttachmentService } from '@proxy/attachments';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { fileType } from './types/fileType.type';
import { MyAttachmentsService } from './types/my.attachments.service';
import { BaseComponent } from '@base/base.component';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.scss'],
})
export class AddAttachmentComponent extends BaseComponent implements OnInit, OnChanges {
  /**
   * accepts :-
   * --------------
   *  'audio/*' | 'video/*' | 'image/*' | '.pdf' | '.jpg' | '.png' | '.doc' | '.docx' | '.mp4' | '.mp3'
   *  the default is null (All files)
   * */
  @Input() acceptedFileType: fileType[] = [];
  private fileToUpload: File | null = null;
  @ViewChild('selectedFile') selectedFile;
  files: FileList;
  @Input() controlName: string;
  @Input() attachmentId: number;
  @Input() attachmentTypeId: number;
  @Input() fileInputId: string;
  @Input() maxFileSize: number;
  @Input() isMultiple: boolean = false;
  @Input() numberOfFiles: number = 1;

  @Output() attachmentOut = new EventEmitter();
  @Output() deleteAttachmentOut = new EventEmitter();
  hideUploadFile = false;
  control: FormControl;
  public form: FormGroup;
  attachmentContent: any = {};
  progress: number = null;
  constructor(
    private attachmentsService: AttachmentService,
    private controlContainer: ControlContainer
  ) {
    super();
  }

  ngOnInit(): void {
    if (!this.fileInputId) this.fileInputId = this.controlName + 'Id';

    this.form = this.controlContainer.control as FormGroup;
    this.control = this.form.get(this.controlName) as FormControl;
  }
  checkIsNumberAttachmentId() {
    if (isNaN(+this.attachmentId) || this.attachmentId == null || this.attachmentId == 0)
      this.hideUploadFile = true;
    else this.hideUploadFile = false;
    return this.hideUploadFile;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.attachmentId && changes?.attachmentId?.currentValue > 0) {
      this.getAttachmentById();
    }
  }
  // onChange
  handleFileInput(event) {
    //this.fileToUpload =this.files.item(0);

    if (event.target.files.length > this.numberOfFiles && this.isMultiple) {
      alert('Please select max ' + this.numberOfFiles + ' files.');
      event.preventDefault();
      event.target.files = [];
      return;
    }

    if (event.target.files.length > 0) {
      //
      this.files = event.target.files;
      const file = event.target.files[0];
      if (this.maxFileSize) {
        if (file.size / 1024 / 1024 > this.maxFileSize) {
          this.ToasterService.error(`max file size is ${this.maxFileSize} Mb`);
        } else {
          this.submit();
        }
      } else {
        this.submit();
      }
      /*    this.myForm.patchValue({
        fileSource: file
      }); */
    }
  }
  onclick(event) {
    event.target.value = null;
  }
  submit() {
    this.progress = 1;
    if (!this.attachmentTypeId) {
      this.ToasterService.error('must pass the attachmentTypeId');
      return;
    }

    const formData = new FormData();
    //formData.append('file', this.myForm.get('fileSource')?.value);
    //  formData.append('files', this.files);

    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
    }
    this.showIntervalLoader();
    this.myAttachmentsService
      .uploadAttachments(formData, this.attachmentTypeId)
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
          } else if (event.type == HttpEventType.Response) {
            // this.progress = null;
            if (event.body) return event.body;
          }
        }),
        catchError((err: any) => {
          this.progress = null;
          //alert(err.message);
          this.hideIntervalLoader();

          return throwError(err.message);
        })
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.hideIntervalLoader();
            if (res?.isValid) {
              let attach = res?.data?.attachmentListDto;
              this.attachmentOut.emit(attach);
              this.attachmentId = attach[0]?.attachmentId;
              this.attachmentContent = {};
              this.attachmentContent.attachmentListDto = [];
              this.attachmentContent.attachmentListDto.push(...(attach as any));
              this.hideUploadFile = true;
            } else {
              this.ToasterService.error(res?.firstErrorMessage);
            }
          }
        },
        err => {
          this.ToasterService.error(err);
          this.hideIntervalLoader();
        }
      );
  }

  deleteFile(item: any, index) {
    // console.log('item', item);
    this.deleteAttachmentOut.emit();
    this.attachmentId = null;
    console.log(this.attachmentContent?.attachmentListDto);
    this.attachmentContent.attachmentListDto.splice(index, 1);
    // if (item) {
    //   this.showIntervalLoader();

    //   this.attachmentsService
    //     .postApiVVersionAttachmentsDeleteFile({
    //       version: environment.API_Version,
    //       attachmentId: item.attachmentId,
    //     })
    //     .subscribe((res) => {
    //       this.hideIntervalLoader();
    //       if (res.isValid) {
    //         console.log(res);
    //         this.attachmentContent = {} as ListAttachmentResponseDto;
    //         let ddd = [] as any;
    //         this.deleteAttachmentOut.emit(res);

    //         this.attachmentId = null;
    //       } else {
    //         this.ToasterService.error(res.firstErrorMessage);
    //       }
    //     });
    // }
  }
  getAttachmentById() {
    if (this.attachmentId > 0) {
      // this.showIntervalLoader();

      this.attachmentsService.downloadFiles(this.attachmentId).subscribe(res => {
        this.hideIntervalLoader();
        if (res.isValid) {
          console.log(res);
          this.attachmentContent = res?.data;
        } else {
          this.attachmentId = null;

          this.ToasterService.error(res.firstErrorMessage);
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
}
