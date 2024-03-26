import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl = environment.apiUrl + '/api/v1/users';

  constructor(private  http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.userApiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.userApiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    const url = `${this.userApiUrl}/${id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.userApiUrl}/${id}`;
    return this.http.delete<void>(url);
  }




}