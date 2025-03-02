import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { StudentAssignedCoursesComponent } from './students-assigned-course.component';

const routes: Routes = [
  {
    path: '',
    component: StudentAssignedCoursesComponent,
    canActivate: [authGuard, permissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentAssignedCoursesRoutingModule {}
