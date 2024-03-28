import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemType } from './models/item-type';
import { environment } from '../../environments/environment';
import { ItemService } from './item.service';
import { Item } from './models/item.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiUrl = environment.apiUrl + '/api/items/types/'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  getTypes(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(this.apiUrl + 'list/');
  }

  getType(id: number): Observable<ItemType> {
    return this.http.get<ItemType>(this.apiUrl + id);
  }

  createType(type: ItemType): Observable<ItemType> {
    return this.http.post<ItemType>(this.apiUrl + 'add/', type);
  }

  updateType(type: ItemType): Observable<ItemType> {
    return this.http.put<ItemType>(this.apiUrl + type.id, type);
  }

  deleteType(id: number): Observable<ItemType> {
    return this.http.delete<ItemType>(this.apiUrl + id);
  }

  bulkCreate(type_id: number, amount: number): Observable<Item[]> {
    // /api/items/types/bulk/2?amount=2
    return this.http.post<Item[]>(this.apiUrl + 'bulk/' + type_id + '?amount=' + amount, {});
  }


}
