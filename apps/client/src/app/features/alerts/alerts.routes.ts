import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertsListComponent } from './pages/alerts-list/alerts-list.component';

export const alertRoutes: Route[] = [
  {
    path: '',
    title: `${environment.APP_NAME} - Alerts`,
    component: AlertsListComponent,
  },
];
