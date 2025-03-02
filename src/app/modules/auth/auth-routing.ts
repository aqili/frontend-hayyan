import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

import { ActiveAccoutComponent } from './components/active-accout/active-accout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'active-acc', component: ActiveAccoutComponent }
    ],
  },
];
