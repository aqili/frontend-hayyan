import { NgModule } from '@angular/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';

import { CourseModalComponent } from './course-modal/course-modal.component';

@NgModule({
  declarations: [CourseComponent, CourseModalComponent],
  imports: [
    CourseRoutingModule,
    SharedModule,
    NgbDatepickerModule, // add this line
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class CourseModule {}
