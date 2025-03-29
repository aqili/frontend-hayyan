import { NgModule } from '@angular/core';

import { PageModule } from '@abp/ng.components/page';


import { SharedModule } from '../shared/shared.module';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [AboutUsComponent],
  imports: [SharedModule, AboutUsRoutingModule, PageModule, CarouselModule],
})
export class AboutUsModule {}
