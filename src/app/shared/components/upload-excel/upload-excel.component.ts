// upload.component.ts
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import { HttpEventType } from '@angular/common/http';

import { BaseComponent } from '@base/base.component';

import { map, catchError, throwError } from 'rxjs';

import { MyAttachmentsService } from '../add-attachment/types/my.attachments.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css'],
})
export class UploadExcelComponent extends BaseComponent {
  selectedFile: File | null = null;
  uploadResponse?: any;
  isLoading = false;
  errorMessage = '';
  progress: number = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Input() apiUrl = '';
  @Output() uploadResponseEvent = new EventEmitter<any>();
  constructor(private uploadService: MyAttachmentsService) {
    super();
  }
  private resetFileInput() {
    this.selectedFile = null;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
    this.uploadResponse = undefined;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.errorMessage = '';
    this.uploadFile();
  }

  uploadFile() {
    this.progress = 1;

    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first';
      return;
    }

    if (!this.selectedFile.name.endsWith('.xlsx')) {
      this.errorMessage = 'Only Excel files are allowed';
      return;
    }

    this.isLoading = true;
    this.showIntervalLoader();
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.uploadService
      .uploadExcel(formData, this.apiUrl)
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
          this.resetFileInput(); // Clear after error

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
              this.uploadResponseEvent.emit(res);
              this.ToasterService.success(
                this.LocalizationService.instant('file uploaded successfully')
              );
            } else {
              if (res.data?.fileBytes) {
                this.download(
                  res.data?.fileBytes,
                  'error_' + this.selectedFile.name,
                  this.selectedFile.type
                );
                this.ToasterService.error(
                  this.LocalizationService.instant('please check the file for the errors')
                );
              } else this.ToasterService.error(res?.firstErrorMessage);

              this.resetFileInput(); // Clear after error

              this.selectedFile = null;
            }
          }
        },
        err => {
          debugger;
          this.resetFileInput(); // Clear after error

          this.ToasterService.error(err);
          this.hideIntervalLoader();
        }
      );
  }

  download(content, name, contentType) {
    const linkSource = 'data:' + contentType + ';base64,' + content;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = name;
    downloadLink.click();
  }
  onclick(event) {
    event.target.value = null;
  }
}
