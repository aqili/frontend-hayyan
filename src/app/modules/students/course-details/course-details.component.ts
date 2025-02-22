import { Component, OnInit } from '@angular/core';

import { BaseModalComponent } from '@base/base-modal.component';

import { ExperimentDto, ExperimentService } from '@proxy/experiments';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent extends BaseModalComponent implements OnInit {
  experiments: any;
  get Service(): ExperimentService {
    return this.getByInjector(ExperimentService);
  }
  courseId: number;
  groupId: number;
  ngOnInit(): void {
    super.ngOnInit();
    var data = this.readeStringParameters();
    this.courseId = data?.courseId;
    this.groupId = data?.groupId;
    this.showIntervalLoader();
    this.Service.getCourseExpirmentsByCourseId(data?.courseId).subscribe(arg => {
      this.hideIntervalLoader();
      if (arg.isValid) {
        this.experiments = arg.data.experiments;
      } else {
        this.ToasterService.error(arg.firstErrorMessage);
      }
    });
  }

  openExperiment(item: ExperimentDto) {
    this.navigateToRouteByEncrypted('students/show-experiment', {
      courseId: this.courseId,
      praxilabsId: item.praxilabsId,
      groupId: this.groupId,
      experimentId: item.id,
    });
  }
}
