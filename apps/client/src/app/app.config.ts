import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appRoutes } from './app.routes';
import { AppLayoutComponent } from './layouts';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './features/auth';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './core/interceptors';

const appInitializer = (authService: AuthService) => {
  return () => authService.loadCurrentUser();
};

const config: SocketIoConfig = { url: environment.WEB_SOCKET_URL, options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom([
      // BrowserModule,
      BrowserAnimationsModule,
      // AppLayoutComponent,
      HttpClientModule,
      SocketIoModule.forRoot(config),
    ]),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
};
