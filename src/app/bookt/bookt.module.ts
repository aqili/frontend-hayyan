import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BooktRoutingModule } from './bookt-routing.module';
import { BooktComponent } from './bookt.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // add this line
import { BooktModalComponent } from './bookt-modal/bookt-modal.component';

@NgModule({
  declarations: [BooktComponent, BooktModalComponent],
  imports: [
    BooktRoutingModule,
    SharedModule,
    NgbDatepickerModule, // add this line
  ],
})
export class BooktModule {}
