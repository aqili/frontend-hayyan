import { authGuard, permissionGuard } from '@abp/ng.core';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayout } from '@layouts/component/app.layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { StudentExperTriesDetailsComponent } from './modules/students-assigned-course/student-exper-tries-details/student-exper-tries-details.component';

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
    loadChildren: () => import('./modules/groups/group.module').then(m => m.GroupModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule),
  },
  {
    path: 'experiments',
    loadChildren: () =>
      import('./modules/experiment/experiment.module').then(m => m.ExperimentModule),
  },
  {
    path: 'instructors',
    loadChildren: () =>
      import('./modules/instructors/instructor.module').then(m => m.InstructorModule),
  },
  {
    path: 'instructor-courses',
    loadChildren: () =>
      import('./modules/instructors-assigned-course/instructors-assigned-course.module').then(
        m => m.InstructorAssignedCoursesModule
      ),
  },
  {
    path: 'student-courses',
    loadChildren: () =>
      import('./modules/students-assigned-course/students-assigned-course.module').then(
        m => m.StudentAssignedCoursesModule
      ),
  },
  {
    path: 'students',
    loadChildren: () => import('./modules/students/students.module').then(m => m.StudentModule),
  },
  {
    path: 'dashboard',
    component: AppLayout,
    children: [
      {
        path: '',
        component: Dashboard
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
