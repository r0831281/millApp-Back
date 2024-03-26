import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemType } from './models/item-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiUrl = environment.apiUrl + '/api/items/types/'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  getTypes(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(this.apiUrl + 'list/');
  }
}
