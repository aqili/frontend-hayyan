import { NgModule } from '@angular/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { EditorModule } from 'primeng/editor';

import { ExperimentRoutingModule } from './experiment-routing.module';
import { ExperimentComponent } from './experiment.component';

import { ExperimentModalComponent } from './experiment-modal/experiment-modal.component';

@NgModule({
  declarations: [ExperimentComponent, ExperimentModalComponent],
  imports: [
    ExperimentRoutingModule,
    SharedModule,
    EditorModule, // Import the EditorModule

    NgbDatepickerModule, // add this line
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class ExperimentModule {}
