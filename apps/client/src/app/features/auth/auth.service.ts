import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpApiService, TokenService } from 'src/app/core/services';
import { LoginResponse, Role, User } from 'src/app/core/models';
import { of } from 'rxjs/internal/observable/of';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.API_URL;
  private http = inject(HttpApiService);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  public get userValue() {
    return this.currentUserSource.value;
  }

  loadCurrentUser() {
    const token = this.tokenService.getAccessToken();

    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http
      .get<User>(`${this.API_URL}/api/auth/profile`, undefined, headers)
      .pipe(
        tap((user) => {
          if (user) {
            // this.tokenService.saveAccessToken(user.jwtToken);
            this.currentUserSource.next(user);
          }
        }),
      );
  }

  signIn({ email, password }: { email: string; password: string }) {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((loginResponse) => {
          if (loginResponse?.user && loginResponse?.accessToken) {
            this.tokenService.saveAccessToken(loginResponse.accessToken);
            // this.tokenService.saveRefreshToken(user.refreshToken);
            this.currentUserSource.next(loginResponse.user);
          }
        }),
      );
  }

  signUp({ email, password }: { email: string; password: string }) {
    return this.http.post<User>(`${this.API_URL}/auth/register`, {
      email,
      password,
    });
  }

  signOut() {
    // const requestBody = {
    //   token: this.tokenService.getAccessToken(),
    // };
    // this.http.post(`${this.API_URL}/auth/signout`, requestBody).subscribe();

    this.tokenService.removeAccessToken();
    // this.tokenService.removeRefreshToken();
    this.currentUserSource.next(null);
    this.router.navigate(['/auth/login']);
  }

  getUserRole(): string {
    return this.userValue?.role ?? Role.USER;
  }

  isAuthorized(userRole: string, authorizedRoles: string[]): boolean {
    // Check if the user has any of the authorized roles
    return authorizedRoles.some((role) => userRole.includes(role));
  }
}
