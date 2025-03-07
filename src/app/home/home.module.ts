import { NgModule } from '@angular/core';

import { PageModule } from '@abp/ng.components/page';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, PageModule, CarouselModule, ButtonModule],
})
export class HomeModule {}
