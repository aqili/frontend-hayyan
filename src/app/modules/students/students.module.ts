import { NgModule } from '@angular/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

import { StudentModalComponent } from './student-modal/student-modal.component';
import { ShowExperimentComponent } from './show-experiment/show-experiment.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

@NgModule({
  declarations: [StudentComponent, StudentModalComponent,CourseDetailsComponent,ShowExperimentComponent],
  imports: [
    StudentRoutingModule,
    SharedModule,
    NgbDatepickerModule, // add this line
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class StudentModule {}
