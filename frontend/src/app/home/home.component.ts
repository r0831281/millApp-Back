import { Component, AfterContentInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../servces/auth.service';
import { ItemService } from '../servces/item.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LocationService } from '../servces/location.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterContentInit{
  itemCount: Observable<number> = new Observable<number>(); // Initialize the itemCount property
  locationCount: Observable<number> = new Observable<number>();

  constructor(public authService: AuthenticationService,
    private itemService: ItemService,
    private locationService: LocationService
    ) {}

  loggedIn() { return this.authService.isLoggedIn(); }

  ngAfterContentInit() {
    this.itemCount = this.itemService.getCount();
    this.locationCount = this.locationService.getCount();
  }

}
