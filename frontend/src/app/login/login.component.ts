import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../servces/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, NgIf, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string;
  password: string;
  error: string;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthenticationService,
    public dialog: MatDialog,
  ) {
    this.username = '';
    this.password = '';
    this.error = '';
   }


  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.authService.storeUser(data.user);
        this.authService.setAccessLevel(data.accessLevel);
        this.authService.storeToken(data.token);
        this.dialogRef.close();
      },
      error: (error) => {
        this.error = "error; please try again."
      }

    });
  }

  close() {
    this.dialogRef.close();
  }


}
