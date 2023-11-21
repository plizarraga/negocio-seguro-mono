import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminShellComponent } from './admin-shell.component';

export const adminRoutes: Route[] = [
  {
    path: '',
    title: `${environment.APP_NAME} - Admin`,
    component: AdminShellComponent,
  },
];
