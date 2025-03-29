import { NgModule } from '@angular/core';

import { PageModule } from '@abp/ng.components/page';


import { SharedModule } from '../shared/shared.module';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [ContactUsComponent],
  imports: [SharedModule, ContactUsRoutingModule, PageModule, CarouselModule],
})
export class ContactUsModule {}
