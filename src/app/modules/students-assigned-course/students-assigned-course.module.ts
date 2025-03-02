import { NgModule } from '@angular/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { StudentAssignedCoursesRoutingModule } from './students-assigned-course-routing.module';
import { StudentAssignedCoursesComponent } from './students-assigned-course.component';

@NgModule({
  declarations: [StudentAssignedCoursesComponent],
  imports: [
    StudentAssignedCoursesRoutingModule,
    SharedModule,
    NgbDatepickerModule, // add this line
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class StudentAssignedCoursesModule {}
