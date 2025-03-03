import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { authGuard, permissionGuard } from '@abp/ng.core';

import { AuthLayoutComponent } from '@layouts/auth-layout/authlayout.component';

import { CourseComponent } from './course.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: '', component: CourseComponent, canActivate: [authGuard, permissionGuard] }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
