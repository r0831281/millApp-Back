import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { AuthenticationService } from './servces/auth.service';
import { Injector } from '@angular/core';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = Injector.create({providers: [{provide: AuthenticationService, useClass: AuthenticationService, deps: []}]});
  const authService = injector.get(AuthenticationService);


  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token).set('Content-Type', 'application/json')
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error && error.status === 401) {
        console.log('Error:', error);
        authService.logout();
      }
      if (error && error.status === 403) {
        console.log('Error:', error);
        authService.logout();
      }
      throw error;
    })
  );
};
