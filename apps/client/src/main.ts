// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

// const appInitializer = (authService: AuthService) => {
//   return () => authService.loadCurrentUser();
// };

import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { AppLayoutComponent } from './app/layouts';
import { appRoutes } from './app/app.routes';

import { AuthService } from './app/features/auth/auth.service';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
