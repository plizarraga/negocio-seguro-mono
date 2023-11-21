import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    title: `${environment.APP_NAME} - Login`,
    component: SignInComponent,
    // loadComponent: () =>
    //   import('./sign-in/sign-in.component').then((mod) => mod.SignInComponent),
  },
  // {
  //   path: 'signup',
  //   title: `${environment.APP_NAME} - Sign Up`,
  //   component: SignUpComponent,
  //   // loadComponent: () =>
  //   //   import('./sign-up/sign-up.component').then((mod) => mod.SignUpComponent),
  // },
];
