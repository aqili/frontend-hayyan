import { AuthService } from '@abp/ng.core';

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
  images: string[] = [
    'https://picsum.photos/id/944/900/500',
    'https://picsum.photos/id/1011/900/500',
    'https://picsum.photos/id/984/900/500',
  ];
  constructor(private authService: AuthService) {}

  login() {
    console.log('Hi from Ts')
    debugger;
    this.authService.navigateToLogin();
  }

  logout() {
    
    this.authService.logout();
  }
}
