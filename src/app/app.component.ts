import { AuthService, LocalizationService, RoutesService, SessionStateService } from '@abp/ng.core';

import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

import { eThemeSharedRouteNames, ToasterService } from '@abp/ng.theme.shared';

import { UserService } from '@shared/service/user.service';

import { delay } from 'rxjs/operators';

import { Shell } from './shared/shell';
import { CustomAuthService } from './shared/service/custom-auth.service';
import { LoaderService } from './shared/service/loader.service';
import { NgIdleService } from './shared/user-idle-manager/service/ng-idle.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.compnent.html',
})
export class AppComponent implements OnInit {
  idleTimerLeft: string;
  FULL_DASH_ARRAY = 283;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  timeRemain: number;
  secondTimerLeft: string;
  interval: any;
  currentUser: any;
  constructor(
    private routes: RoutesService,
    private localization: LocalizationService,
    private inject: Injector,
    public sessionState: SessionStateService,
    public loaderService: LoaderService,
    private ngIdle: NgIdleService,
    public customAuthService: CustomAuthService,
    public userService: UserService,
    private router: Router,
    private toasterService: ToasterService,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    routes?.patch(eThemeSharedRouteNames.Administration, { invisible: true });

    Shell.injector = inject;
    Shell.Main = this;
    let cuulang = localStorage.getItem('currentLang');
    if (!cuulang) {
      localStorage.setItem('currentLang', 'ar');
      this.sessionState.setLanguage('ar');
      window.location.reload();
    } else {
      localStorage.setItem('currentLang', this.localization.currentLang);
    }

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    /* this.router.events.subscribe((ev:any) => {
      if (ev instanceof NavigationStart) {

          if (ev.url != this.lastPoppedUrl)
              this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
          if (ev.url == this.lastPoppedUrl) {
              this.lastPoppedUrl = undefined;
              window.scrollTo(0, this.yScrollStack.pop());
          } else
              window.scrollTo(0, 0);
      }
  });



 */

    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        delay(2000);
        this.toasterService.clear();
      }
    });

    this.interval = setTimeout(() => {
      this.currentUser = userService.getCurrentUser();
      if (this.currentUser) clearInterval(this.interval);
    }, 1000);
    console.log(this.currentUser);
  }

  changeLang() {
    this.sessionState.setLanguage(this.sessionState.getLanguage() == 'ar' ? 'en' : 'ar');
    location.reload();
  }

  login() {
    this.customAuthService.login();
  }
  /*   onActivate(event) {
    window.scroll(0, 0);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  } */

  ngOnInit(): void {
    console.log('ngOnInit');
    this.route.fragment.subscribe((fragment: string | null) => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 0);
      }
    });
  }
}
