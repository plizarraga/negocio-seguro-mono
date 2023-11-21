import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  removeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  // saveRefreshToken(refreshToken: string) {
  //   localStorage.setItem('refreshToken', refreshToken);
  // }

  // getRefreshToken() {
  //   return localStorage.getItem('refreshToken');
  // }

  // removeRefreshToken() {
  //   localStorage.removeItem('refreshToken');
  // }
}
