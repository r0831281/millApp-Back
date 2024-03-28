import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserItemIn, UserItemOut } from './models/user-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserItemService {
  private apiUrl = environment.apiUrl + "/api/items/userItems/"; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  getUserItems(): Observable<UserItemIn[]> {
    return this.http.get<UserItemIn[]>(this.apiUrl + 'list/');
  }

  getUserItem(id: number): Observable<UserItemIn> {
    return this.http.get<UserItemIn>(this.apiUrl + id);
  }

  createUserItem(item: UserItemOut) {
    return this.http.post(this.apiUrl + 'add/', item);
  }

  updateUserItem(item: UserItemOut) {
    return this.http.put(this.apiUrl + item.id, item);
  }

  deleteUserItem(id: number) {
    return this.http.delete(this.apiUrl + id);
  }


}
