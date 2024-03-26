import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../servces/user.service';
import { User } from '../../../servces/models/user';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../servces/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatTableModule, MatIcon, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'Role', 'actions'];
  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public authService: AuthenticationService
    ) { }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  getCurrentUserAcces() {
    return this.authService.getAccessLevel;
  }


  ngOnInit() {
    this.loadUsers();
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.initializeDataSource();
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filter value: ', filterValue);
  }

  openDialog(element: User) {
    console.log('Open dialog', element);
  }



}
