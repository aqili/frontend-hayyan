import { AuthService } from '@abp/ng.core';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    console.log('AboutUS initialized');
  }
}
