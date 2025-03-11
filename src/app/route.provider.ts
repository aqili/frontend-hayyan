import { RoutesService, eLayoutType } from '@abp/ng.core';

import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      // {
      //   path: '/books',
      //   name: '::Menu:Books',
      //   iconClass: 'fas fa-book',
      //   layout: eLayoutType.application,
      //   requiredPolicy: 'Hayaan.Books',
      // },
      {
        path: '/groups',
        name: '::Menu:Groups',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
      },
      {
        path: '/courses',
        name: '::Menu:Courses',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
      },
      {
        path: '/experiments',
        name: '::Menu:Experiments',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
      },
      {
        path: '/instructors',
        name: '::Menu:Instructors',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
      },
      {
        path: '/students',
        name: '::Menu:Students',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
      },

      {
        path: '/instructor-courses',
        name: '::Menu:InstructorCourses',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
      },
      {
        path: '/student-courses',
        name: '::Menu:StudentCourses',
        iconClass: 'fas fa-book',
        layout: eLayoutType.application,
      },
    ]);
  };
}
