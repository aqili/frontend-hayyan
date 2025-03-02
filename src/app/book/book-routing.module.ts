import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { BookComponent } from './book.component';
import { AppLayout } from '@layouts/component/app.layout';

const routes: Routes = [
  { 
    path: '', 
    component: AppLayout,
    children: [
      {
        path: '',
        component: BookComponent,
        canActivate: [authGuard, permissionGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
