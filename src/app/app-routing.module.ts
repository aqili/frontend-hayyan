import { authGuard, permissionGuard } from '@abp/ng.core';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  { path: 'books', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
