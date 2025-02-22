import { NgModule } from '@angular/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { InstructorAssignedCoursesRoutingModule } from './instructors-assigned-course-routing.module';
import { InstructorAssignedCoursesComponent } from './instructors-assigned-course.component';

@NgModule({
  declarations: [InstructorAssignedCoursesComponent],
  imports: [
    InstructorAssignedCoursesRoutingModule,
    SharedModule,
    NgbDatepickerModule, // add this line
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class InstructorAssignedCoursesModule {}
