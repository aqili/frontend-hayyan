import { AuthService } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  responsiveOptions: any[];

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
  images: string[] = [
    './assets/wp-content/uploads/2024/12/abstract-digital-network-with-hexagons-1.png',
    './assets/wp-content/uploads/2024/12/enhance-your-product-display-use-purple-glass-dark-background-concept-product-photography-dark-background-purple-glass-enhancing-displays-1-1.png',
    './assets/wp-content/uploads/2024/12/scientist-is-working-microscope-1.png',
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }
  login() {
    debugger;
    this.authService.navigateToLogin();
  }

  logout() {

    this.authService.logout();
  }
}
