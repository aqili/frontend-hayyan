import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard, permissionGuard } from '@abp/ng.core';
import { StudentComponent } from './student.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ShowExperimentComponent } from './show-experiment/show-experiment.component';
import { AppLayout } from '@layouts/component/app.layout';
import { StudentHistoryExperimentsComponent } from './History-Experiments/StudentHistoryExperimentsComponent';
import { AdminInstractorAuthGuard } from '@shared/guards/admin-instractor-guard.guard';
import { StudentAuthGuard } from '@shared/guards/student-guard.guard';

const routes: Routes = [
  {
    path: '', 
    component: AppLayout,
    children: [
      {
        path: '',
        component: StudentComponent,
        canActivate: [authGuard, permissionGuard ,AdminInstractorAuthGuard],
      },
      {
        path: 'history-experiment',
        component: StudentHistoryExperimentsComponent,
        canActivate: [authGuard, permissionGuard ,AdminInstractorAuthGuard],
      },
      { path: 'course', component: CourseDetailsComponent, 
        canActivate: [authGuard, permissionGuard , StudentAuthGuard] },
      {
        path: 'experiment',
        component: CourseDetailsComponent,
        canActivate: [authGuard, permissionGuard,StudentAuthGuard],
      },
      {
        path: 'show-experiment',
        component: ShowExperimentComponent,
        canActivate: [authGuard, permissionGuard,StudentAuthGuard],
      },
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}