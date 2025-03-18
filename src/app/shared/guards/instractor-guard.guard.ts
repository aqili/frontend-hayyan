import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '@shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class InstractorAuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.checkCurrentUserInRole('Instractor')) {
      return true;
    } else {
      return false;
    }
  }
}