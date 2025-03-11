import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { SharedModule } from '@shared/shared.module';

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

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Main Site',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
        ],
      },
      {
        label: 'Pages',
        items: [
          {
            label: '::Menu:Groups',
            icon: 'fas fa-users',
            routerLink: ['/groups'],
          },
          {
            label: '::Menu:Courses',
            icon: 'fas fa-graduation-cap',
            routerLink: ['/courses'],
          },
          {
            label: '::Menu:Experiments',
            icon: 'fas fa-flask',
            routerLink: ['/experiments'],
          },
          {
            label: '::Menu:Instructors',
            icon: 'fas fa-chalkboard-teacher',
            routerLink: ['/instructors'],
          },
          {
            label: '::Menu:Students',
            icon: 'fas fa-user-graduate',
            routerLink: ['/students'],
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
