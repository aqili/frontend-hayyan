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

import { CustomAuthService } from '@shared/service/custom-auth.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '@shared/service/user.service';
import { IdentityRoles } from '@proxy/enums';
@Injectable({
  providedIn: 'root',
})
export class CompleteRegisterGuard implements CanActivateChild,CanActivate {
  constructor(
    private investorService: InvestorService,
    private customAuthService: CustomAuthService,private userService:UserService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.customAuthService.hasValidAccessToken()) {
      return true;
    }
    if (localStorage.getItem('IsCompleteReg') == 'true') {
      return true;
    }
    return this.investorService.checkUserIsCompleteRegister().pipe(
      map(c => {
        if (!c) {
          localStorage.setItem('IsCompleteReg', 'true');
          return true;
        }
        this.router.navigate(['/complete-reg']);
        return false;
      })
    );  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.customAuthService.hasValidAccessToken()) {
      return true;
    }
    if (localStorage.getItem('IsCompleteReg') == 'true') {
      return true;
    }
    return this.investorService.checkUserIsCompleteRegister().pipe(
      map(c => {
        if (!c) {
          localStorage.setItem('IsCompleteReg', 'true');
          return true;
        }
        this.router.navigate(['/complete-reg']);
        return false;
      })
    );
  }
}
