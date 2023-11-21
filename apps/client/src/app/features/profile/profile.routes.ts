import { Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfileShowComponent } from './pages/profile-show/profile-show.component';

export const profileRoutes: Route[] = [
  {
    path: '',
    title: `${environment.APP_NAME} - Profile`,
    component: ProfileShowComponent,
  },
];
