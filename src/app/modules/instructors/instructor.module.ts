import { NgModule } from '@angular/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';

import { InstructorModalComponent } from './instructor-modal/instructor-modal.component';
import { UploadExcelComponent } from '@shared/components/upload-excel/upload-excel.component';

@NgModule({
  declarations: [InstructorComponent, InstructorModalComponent],
  imports: [
    InstructorRoutingModule,
    SharedModule,
    NgbDatepickerModule, // add this line
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class InstructorModule {}
