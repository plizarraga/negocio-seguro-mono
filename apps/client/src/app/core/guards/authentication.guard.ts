import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/auth.service';

export const authenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.userValue;

  if (user) {
    // check if route is restricted by role
    if (route.data['roles'] && !route.data['roles'].includes(user.role)) {
      // role not authorized so redirect to home page
      router.navigate(['/']);
      return false;
    }

    // authorized so return true
    return true;
  } else {
    // not logged in so redirect to login page with the return url
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
};
