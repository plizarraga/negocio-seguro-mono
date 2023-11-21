import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmptyLayoutComponent, AppLayoutComponent } from './layouts';
import { authenticationGuard, noAuthenticationGuard } from './core/guards';
import { Role } from './core/models';

export const appRoutes: Routes = [
  {
    path: 'auth',
    component: EmptyLayoutComponent,
    canActivate: [noAuthenticationGuard],
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    component: AppLayoutComponent,
    title: `${environment.APP_NAME} - Dashboard`,
    children: [
      {
        path: '',
        canActivate: [authenticationGuard],
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (mod) => mod.DashboardComponent,
          ),
      },
      {
        path: 'profile',
        canActivate: [authenticationGuard],
        loadChildren: () =>
          import('./features/profile/profile.routes').then(
            (routes) => routes.profileRoutes,
          ),
      },
      {
        path: 'admin',
        canActivate: [authenticationGuard],
        data: { roles: [Role.ADMIN] },
        loadChildren: () =>
          import('./features/admin/admin.routes').then(
            (routes) => routes.adminRoutes,
          ),
      },
      {
        path: 'alerts',
        canActivate: [authenticationGuard],
        loadChildren: () =>
          import('./features/alerts/alerts.routes').then(
            (routes) => routes.alertRoutes,
          ),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
