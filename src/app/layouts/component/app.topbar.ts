import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService, SessionStateService } from '@abp/ng.core';

import { MenuItem } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';

import { LayoutService } from '../service/layout.service';

import { AppConfigurator } from './app.configurator';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
  template: ` <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        (click)="layoutService.onMenuToggle()"
      >
        <i class="pi pi-bars"></i>
      </button>
      <a class="layout-topbar-logo" routerLink="/">
        <img
          src="./assets/wp-content/uploads/2024/11/Group1171275980.svg"
          alt="logo"
          class="w-50"
          loading="lazy"
        />
      </a>
    </div>

    <div class="layout-topbar-actions align-items-center">
      <h6 class="mb-0">{{ userService?.getCurrentUser()?.name }}</h6>
      <div class="layout-config-menu">
        <div class="relative">
          <!-- <button
            class="layout-topbar-action layout-topbar-action-highlight"
            pStyleClass="@next"
            enterFromClass="hidden"
            enterActiveClass="animate-scalein"
            leaveToClass="hidden"
            leaveActiveClass="animate-fadeout"
            [hideOnOutsideClick]="true"
          >
            <i class="pi pi-palette"></i>
          </button> -->
          <app-configurator />
        </div>
      </div>
      <button
        class="layout-topbar-menu-button layout-topbar-action"
        pStyleClass="@next"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveToClass="hidden"
        leaveActiveClass="animate-fadeout"
        [hideOnOutsideClick]="true"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          <button type="button" class="layout-topbar-action" (click)="languageToggle()">
            {{ this.currentLanguage === 'ar' ? 'En' : 'عربي' }}
          </button>

          <button
            title="logOut"
            *ngIf="hasLoggedIn"
            (click)="logout()"
            type="button"
            class="layout-topbar-action"
          >
            <i class="pi pi-sign-out mx-1"></i>
            <span>logOut</span>
          </button>
          <button
            title="login"
            *ngIf="!hasLoggedIn"
            (click)="login()"
            type="button"
            class="layout-topbar-action"
          >
            <i class="pi pi-sign-in"></i>
            <span>login</span>
          </button>
        </div>
      </div>
    </div>
  </div>`,
})
export class AppTopbar {
  items!: MenuItem[];
  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private stateService: SessionStateService,
    public userService: UserService,
  ) {}
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
  get currentLanguage() {
    return this.stateService.getLanguage();
  }
  languageToggle() {
    this.stateService.setLanguage(this.currentLanguage === 'ar' ? 'en' : 'ar');
    window.location.reload();
  }
  toggleDarkMode() {
    this.layoutService.layoutConfig.update(state => ({ ...state, darkTheme: !state.darkTheme }));
  }
  login() {
    this.authService.navigateToLogin();
  }
  logout() {
    this.authService.logout();
  }
}
