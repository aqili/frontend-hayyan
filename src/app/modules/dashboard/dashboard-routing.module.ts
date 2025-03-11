import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { AppLayout } from '@layouts/component/app.layout';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  { 
    path: '', 
    component: AppLayout,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard, permissionGuard],
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
