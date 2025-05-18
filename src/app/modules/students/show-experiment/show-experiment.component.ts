import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BaseModalComponent } from '@base/base-modal.component';

import { ResponseData } from '@proxy/domain/shared/common';
import { ExperimentService } from '@proxy/experiments';

@Component({
  selector: 'app-show-experiment',
  templateUrl: './show-experiment.component.html',
  styleUrl: './show-experiment.component.scss',
})
export class ShowExperimentComponent extends BaseModalComponent implements OnInit {
  get Service(): ExperimentService {
    return this.getByInjector(ExperimentService);
  }
  get DomSanitizer(): DomSanitizer {
    return this.getByInjector(DomSanitizer);
  }
  labLink: SafeResourceUrl;
  ngOnInit(): void {
    super.ngOnInit();
    var data = this.readeStringParameters();
    this.getExperimentByCourseId(data.courseId, data.experimentId, data.praxilabsId, data.groupId);
  }
  @ViewChild('myIframe') myIframe!: ElementRef;
  goFullscreen() {
    const iframeEl = this.myIframe.nativeElement;

    if (iframeEl.requestFullscreen) {
      iframeEl.requestFullscreen();
    } else if (iframeEl.webkitRequestFullscreen) { // Safari
      iframeEl.webkitRequestFullscreen();
    } else if (iframeEl.msRequestFullscreen) { // IE11
      iframeEl.msRequestFullscreen();
    }
  }

  getExperimentByCourseId(
    courseId: number,
    experimentId: number,
    PraxisId: string,
    groupId: number
  ) {
    this.showIntervalLoader();
    this.Service.startExperimentByCourseIdAndExperimentIdAndPraxisIdAndGroupId(
      courseId,
      experimentId,
      PraxisId,
      groupId
    ).subscribe((arg: ResponseData<string>) => {
      this.hideIntervalLoader();

      if (arg.isValid) {
        this.labLink = this.DomSanitizer.bypassSecurityTrustResourceUrl(arg.data);
      } else {
        this.ToasterService.error(arg.firstErrorMessage);
      }
    });
  }
}
