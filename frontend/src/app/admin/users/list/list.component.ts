import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UpdateComponent } from '../../users/update/update.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatTableModule, MatIcon, NgIf, MatDialogModule, UpdateComponent, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'Role', 'actions'];
  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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



  ngOnInit() {
    this.loadUsers();
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
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

  openDialog(user: User) {
    console.log('Element: ', user);
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: {user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.userService.updateUser(result).subscribe(() => {
          if (result.id === user.id) {
            this.loadUsers();
            return result;
          }
          else {
            console.log('Error updating user');
          }
          this.loadUsers();
        });
      }
    });


  }



}
