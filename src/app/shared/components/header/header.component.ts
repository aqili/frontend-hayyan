import { AuthService, SessionStateService } from '@abp/ng.core';
import { LazyLoadService, LOADING_STRATEGY } from '@abp/ng.core';

import { Component } from '@angular/core';

import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent extends BaseComponent {
  stylesLoaded$ = this.lazyLoadService.load(
    LOADING_STRATEGY.AppendAnonymousStyleToHead(
      this.IsArabic ? '/assets/branding/css/rtl/style.css' : '/assets/branding/css/ltr/style.css',
    ),
  );
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
  constructor(
    public sessionState: SessionStateService,
    private lazyLoadService: LazyLoadService,
    private authService: AuthService,
  ) {
    super();
  }
  changeLang() {
    this.sessionState.setLanguage(this.sessionState.getLanguage() == 'ar' ? 'en' : 'ar');
    location.reload();
  }

  login() {
    this.authService.navigateToLogin();
    //this.Router.navigateByUrl('/dashboard');
  }
  logout() {
    this.authService.logout();
  }
}
