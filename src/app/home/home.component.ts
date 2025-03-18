import { AuthService } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  images: { src: string; text: string }[] = [
    {
      src: './assets/wp-content/uploads/2home.png',
      text: '',
    },
    {
      src: './assets/wp-content/uploads/1home.png',
      text: '',
    },
    {
      src: './assets/wp-content/uploads/3home.png',
      text: '',
    },
  ];
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    /*   this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }); */
  }
  login() {
    debugger;
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout();
  }
}
