import { AuthService } from '@abp/ng.core';

  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@shared/service/loader.service';
import { Shell } from '@shared/shell';

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
    private route: ActivatedRoute,  private router2: Router,
  ) {}
  get LoaderService(): LoaderService {
    return Shell.injector.get(LoaderService);
  }
  ngOnInit(): void {
    // Show loader while page is loading
    this.LoaderService.show();
    
    // Check if user is logged in
    if (this.hasLoggedIn) {
      // Redirect to dashboard
      this.router2.navigate(['/dashboard']);
      this.LoaderService.hide();
      return;
    }
    
    // Hide loader when page is done loading
    this.LoaderService.hide();

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
