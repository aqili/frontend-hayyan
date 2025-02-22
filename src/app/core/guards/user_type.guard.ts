import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { InvestorService } from '@proxy/investors/investor.service';
import { IdentityRoles } from '@proxy/enums';

import { CustomAuthService } from '@shared/service/custom-auth.service';
import { UserService } from '@shared/service/user.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserTypeGuard implements CanActivateChild, CanActivate {
  constructor(
    private investorService: InvestorService,
    private customAuthService: CustomAuthService,
    private router: Router,
    private userService: UserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.customAuthService.hasValidAccessToken()) {
      return true;
    }

    if (
      this.userService
        .getCurrentUserRoles()
        .includes(IdentityRoles[IdentityRoles.OperationsOfficer])
    ) {
      this.customAuthService.logOut();
      return false;
    } else return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.customAuthService.hasValidAccessToken()) {
      return true;
    }

    if (
      this.userService
        .getCurrentUserRoles()
        .includes(IdentityRoles[IdentityRoles.OperationsOfficer])
    ) {
      this.customAuthService.logOut();
      return false;
    } else return true;
  }
}
