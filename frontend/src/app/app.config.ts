import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';

import { jwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { AuthenticationService } from './servces/auth.service';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DatePipe } from '@angular/common';
import { AsyncPipe } from '@angular/common';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([jwtInterceptorInterceptor])), AuthenticationService, provideLuxonDateAdapter(), DatePipe, AsyncPipe],
};
