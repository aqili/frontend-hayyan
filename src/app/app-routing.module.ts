import { authGuard, permissionGuard } from '@abp/ng.core';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentExperTriesDetailsComponent } from './modules/students-assigned-course/student-exper-tries-details/student-exper-tries-details.component';
import { AppLayout } from '@layouts/component/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { AdminAuthGuard } from '@shared/guards/admin-guard.guard';
import { StudentAuthGuard } from '@shared/guards/student-guard.guard';
import { InstractorAuthGuard } from '@shared/guards/instractor-guard.guard';
import { AdminInstractorAuthGuard } from '@shared/guards/admin-instractor-guard.guard';

const routes: Routes = [

    {
      path: 'StudentExperTries', component:StudentExperTriesDetailsComponent
    },
  ,
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'groups',
    canActivate:[AdminInstractorAuthGuard],
    loadChildren: () => import('./modules/groups/group.module').then(m => m.GroupModule),
  },
  {
    path: 'courses',
    canActivate:[AdminInstractorAuthGuard],
    loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule),
  },
  {
    path: 'experiments',
    canActivate:[AdminInstractorAuthGuard],
    loadChildren: () =>
      import('./modules/experiment/experiment.module').then(m => m.ExperimentModule),
  },
  {
    path: 'instructors',
    canActivate:[AdminAuthGuard],
    loadChildren: () =>
      import('./modules/instructors/instructor.module').then(m => m.InstructorModule),
  },
  {
    path: 'instructor-courses',
    canActivate:[InstractorAuthGuard],
    loadChildren: () =>
      import('./modules/instructors-assigned-course/instructors-assigned-course.module').then(
        m => m.InstructorAssignedCoursesModule
      ),
  },
  {
    path: 'student-courses',
    canActivate:[StudentAuthGuard],
    loadChildren: () =>
      import('./modules/students-assigned-course/students-assigned-course.module').then(
        m => m.StudentAssignedCoursesModule
      ),
  },
  {
    path: 'students',
    //canActivate:[AdminInstractorAuthGuard],
    loadChildren: () => import('./modules/students/students.module').then(m => m.StudentModule),
  },
  {

    path: 'auth',

    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),

  },
  {
    path: 'dashboard',
    //component: AppLayout,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    // children: [
    //   {
    //     path: '',
    //     component: Dashboard
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
