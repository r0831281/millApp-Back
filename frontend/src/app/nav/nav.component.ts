import { Component, ViewChild, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Event, NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../servces/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, RouterModule, CommonModule, LoginComponent, MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent{
  username: string;
  password: string;
  error: string;
  authservice: AuthenticationService;

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthenticationService) {
    this.username = '';
    this.password = '';
    this.error = '';
    this.authservice = authService;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.handleRouteChange(event.url);
      }
    });
  }
  @ViewChild(MatSidenav) sidenav?: MatSidenav;
currentRoute: string = '';

handleRouteChange(url: string) {
  this.currentRoute = url;
}

openLoginDialog() {
  const isLoggedIn = this.authService.isLoggedIn();

  const dialogRef = this.dialog.open(LoginComponent, {
    height: '350px',
    data: { isLoggedIn }
  });

  dialogRef.afterClosed().subscribe(loginResult => {
    if (loginResult) { // Successful login
      this.username = loginResult.username;
      this.router.navigate(['/']);
    } else {
      this.error = 'Login failed!';
    }
  });
}
}

