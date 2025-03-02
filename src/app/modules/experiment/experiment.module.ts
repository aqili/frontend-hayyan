import { NgModule } from '@angular/core';

import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { ExperimentRoutingModule } from './experiment-routing.module';
import { ExperimentComponent } from './experiment.component';

import { ExperimentModalComponent } from './experiment-modal/experiment-modal.component';

@NgModule({
  declarations: [ExperimentComponent, ExperimentModalComponent],
  imports: [
    ExperimentRoutingModule,
    SharedModule,
    NgbDatepickerModule, // add this line
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class ExperimentModule {}
