// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl + '/api/auth/sign_in';
  public logedIn = false;

  constructor(private http: HttpClient, public router: Router) { }


  login(username: string, password: string): Observable<any> {
    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    this.logedIn = true;
    return this.http.post(this.apiUrl, body);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessLevel');
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.logedIn = false;
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.logedIn = true;
    }
    else {
      this.logedIn = false;
    }
    return this.logedIn;
  }

  storeUser(user: string) {
    localStorage.setItem('currentUser', user);
  }

  getUser() {
    return localStorage.getItem('currentUser');
  }

  setAccessLevel(accessLevel: string) {
    localStorage.setItem('accessLevel', accessLevel);
  }

  getAccessLevel() {
    return localStorage.getItem('accessLevel');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
