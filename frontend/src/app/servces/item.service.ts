import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './models/item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemApiUrl = environment.apiUrl + '/api/items/';

  constructor(private http: HttpClient) {

  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemApiUrl + 'list');
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.itemApiUrl + 'count');
  }

  getItem(id: number): Observable<Item> {
    let item = this.http.get<Item>(this.itemApiUrl + id);
    return item;
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemApiUrl + 'create/', item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemApiUrl + 'put/' + item.id , item);
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(this.itemApiUrl + id);
  }
  scanItem(id: number): Observable<Item> {
    return this.http.get<Item>(this.itemApiUrl + 'scan/' + id);
  }


}
