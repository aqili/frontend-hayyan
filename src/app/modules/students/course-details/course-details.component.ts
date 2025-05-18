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
  mode: 'dark' | 'light' = 'dark';
  get Service(): ExperimentService {
    return this.getByInjector(ExperimentService);
  }
  courseId: number;
  groupId: number;
  praxisImages: string[] = [
    '1.png', '1-3.png', '2.png', '2-3.png', '2.webp', '4-3.png', '5-3.png', '7-2.png',
    '24.webp', '34555.png', '345345345.webp', '534535.png', '5435345.webp', 'gfdg.png',
    'Rectangle-8687.png', 'Rectangle-8687-1.png', 'Rectangle-8687-1.webp', 'Rectangle-8687-1-3.webp',
    'Rectangle-8687-2.png'
  ];
  selectedExperiment: any = null;
  showDescriptionModal = false;

  getRandomImage(): string {
    const idx = Math.floor(Math.random() * this.praxisImages.length);
    return `assets/images/praxis/${this.praxisImages[idx]}`;
  }

  toggleDescription(item: any) {
    item.expanded = !item.expanded;
  }

  toggleMode() {
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
  }

  ngOnInit(): void {
    super.ngOnInit();
    var data = this.readeStringParameters();
    this.courseId = data?.courseId;
    this.groupId = data?.groupId;
    this.showIntervalLoader();
    this.Service.getCourseExpirmentsByCourseId(data?.courseId).subscribe(arg => {
      this.hideIntervalLoader();
      if (arg.isValid) {
        this.experiments = arg.data.experiments.map(exp => ({
          ...exp,
          image: this.getRandomImage(),
          expanded: false
        }));
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

  openDescriptionModal(item: any) {
    this.selectedExperiment = item;
    this.showDescriptionModal = true;
  }

  closeDescriptionModal() {
    this.selectedExperiment = null;
    this.showDescriptionModal = false;
  }
}
