import { AuthService } from '@abp/ng.core';

import { Injectable } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';

const STORE_KEY = 'userLastAction';

@Injectable({ providedIn: 'root' })
export class CustomAuthService {
  constructor(private authService: AuthService, private oauthService: OAuthService) {}
  hasValidAccessToken() {
    return this.oauthService.hasValidAccessToken();
  }
  logOut() {
    this.oauthService.logOut();
    localStorage.clear();
    this.authService.logout().subscribe(v => {
      localStorage.clear();
    });
  }
  login() {
    localStorage.clear();
    this.authService.navigateToLogin();
  }
}
