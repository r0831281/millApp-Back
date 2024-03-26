import { Component , NgModule, ViewChild} from '@angular/core';
import { environment } from './../environments/environment';
import { RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HomeComponent, RouterLink, NavComponent, HttpClientModule, MatDialogModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inventory-front';
  environment = environment;
}

