import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/auth.service';

export const noAuthenticationGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.userValue;

  if (user) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
