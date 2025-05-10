import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserType } from '@proxy/domain/shared/enums';

import { SharedModule } from '@shared/shared.module';
import { Shell } from '@shared/shell';

import { MenuItem } from 'primeng/api';

import { UserService } from '../../shared/service/user.service';

import { AppMenuitem } from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule, SharedModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
})
export class AppMenu {
  model: MenuItem[] = [];
  get userService(): UserService {
    return Shell.injector.get(UserService);
  }
  ngOnInit() {
    this.model = [
      {
        label: '::Menu:Home',
        items: [
          /*  {
            label: '::Menu:HomePage',
            icon: 'pi pi-fw pi-home',

            routerLink: ['/'],
          }, */
          { label: '::Menu:Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
        ],
      },
      {
        label: '::Menu:Pages',
        items: [
          {
            label: '::Menu:Groups',
            icon: 'fas fa-users',
            visible: this.userService.checkCurrentUserInRoles([
              UserType[UserType.admin],
              UserType[UserType.Instractor],
            ]),
            routerLink: ['/groups'],
          },
          {
            label: '::Menu:Courses',
            icon: 'fas fa-graduation-cap',
            visible: this.userService.checkCurrentUserInRoles([
              UserType[UserType.admin],
              UserType[UserType.Instractor],
            ]),
            routerLink: ['/courses'],
          },
          {
            label: '::Menu:Experiments',
            icon: 'fas fa-flask',
            visible: this.userService.checkCurrentUserInRoles([
              UserType[UserType.admin],
              UserType[UserType.Instractor],
            ]),
            routerLink: ['/experiments'],
          },
          {
            label: '::Menu:Instructors',
            icon: 'fas fa-chalkboard-teacher',
            visible: this.userService.checkCurrentUserInRole(UserType[UserType.admin]),
            routerLink: ['/instructors'],
          },
          {
            label: '::Menu:Students',
            icon: 'fas fa-user-graduate',
            visible: this.userService.checkCurrentUserInRoles([
              UserType[UserType.admin],
              UserType[UserType.Instractor],
            ]),
            routerLink: ['/students'],
          },
          {
            label: '::Menu:StudentCourses',
            icon: 'fas fa-user-graduate',
            visible: this.userService.checkCurrentUserInRole(UserType[UserType.Student]),
            routerLink: ['/student-courses'],
          },
          {
            label: '::Menu:InstructorCourses',
            icon: 'fas fa-chalkboard-teacher',
            visible: this.userService.checkCurrentUserInRole(UserType[UserType.Instractor]),
            routerLink: ['/instructor-courses'],
          },
          {
            label: '::Menu:historyExperiments',
            icon: 'fas fa-chalkboard-teacher',
            visible: this.userService.checkCurrentUserInRoles([
              UserType[UserType.admin],
              UserType[UserType.Instractor],
            ]),
            routerLink: ['/students/history-experiment'],
          },
          // {
          //   label: 'Landing',
          //   icon: 'pi pi-fw pi-globe',
          //   routerLink: ['/landing'],
          // },
          // {
          //   label: 'Auth',
          //   icon: 'pi pi-fw pi-user',
          //   items: [
          //     {
          //       label: 'Login',
          //       icon: 'pi pi-fw pi-sign-in',
          //       routerLink: ['/auth/login'],
          //     },
          //     {
          //       label: 'Error',
          //       icon: 'pi pi-fw pi-times-circle',
          //       routerLink: ['/auth/error'],
          //     },
          //     {
          //       label: 'Access Denied',
          //       icon: 'pi pi-fw pi-lock',
          //       routerLink: ['/auth/access'],
          //     },
          //   ],
          // },
          // {
          //   label: 'Crud',
          //   icon: 'pi pi-fw pi-pencil',
          //   routerLink: ['/pages/crud'],
          // },
          // {
          //   label: 'Not Found',
          //   icon: 'pi pi-fw pi-exclamation-circle',
          //   routerLink: ['/pages/notfound'],
          // },
          // {
          //   label: 'Empty',
          //   icon: 'pi pi-fw pi-circle-off',
          //   routerLink: ['/pages/empty'],
          // },
        ],
      },
    ];
  }
}
