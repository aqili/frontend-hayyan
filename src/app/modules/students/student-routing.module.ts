import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { StudentComponent } from './student.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ShowExperimentComponent } from './show-experiment/show-experiment.component';
import { AppLayout } from '@layouts/component/app.layout';

//const routes: Routes = [
//  { 
//    path: '', 
//    component: AppLayout,
//    children: [
//      {
//        path: '',
//        component: StudentComponent,
//        canActivate: [authGuard, permissionGuard],
//      }
//    ]
//  },
//];



const routes: Routes = [
  //{ path: '', component: StudentComponent, canActivate: [authGuard, permissionGuard] },
  { path: 'course', component: CourseDetailsComponent, canActivate: [authGuard, permissionGuard] },
  {
    path: 'experiment',
    component: CourseDetailsComponent,
    canActivate: [authGuard, permissionGuard],
  },
  {
    path: 'show-experiment',
    component: ShowExperimentComponent,
    canActivate: [authGuard, permissionGuard],
  },
  { 
    path: '', 
    component: AppLayout,
    children: [
      {
        path: '',
        component: StudentComponent,
        canActivate: [authGuard, permissionGuard],
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
