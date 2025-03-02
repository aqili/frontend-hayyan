import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';


import { routes } from './auth-routing';
import { AuthComponent } from './auth.component';

import { ActiveAccoutComponent } from './components/active-accout/active-accout.component';

@NgModule({
  declarations: [
    AuthComponent,
    ActiveAccoutComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class AuthModule {}
