import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';

import { GroupModalComponent } from './group-modal/group-modal.component';

@NgModule({
  declarations: [GroupComponent, GroupModalComponent],
  imports: [GroupRoutingModule, SharedModule],
})
export class GroupModule {}
