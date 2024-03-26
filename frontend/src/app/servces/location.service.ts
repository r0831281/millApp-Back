import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from './models/location';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationAPIUrl = environment.apiUrl + '/api/locations/';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationAPIUrl + 'list');
  }

  deleteLocation(id: number): Observable<Location> {
    return this.http.delete<Location>(this.locationAPIUrl + id);
  }

  updateLocation(location: Location): Observable<Location> {
    return this.http.put<Location>(this.locationAPIUrl + 'put/' + location.id, location);
  }


  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.locationAPIUrl + 'create/', location);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.locationAPIUrl + 'count');
  }

}
