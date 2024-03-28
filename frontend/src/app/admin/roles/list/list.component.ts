import { Component } from '@angular/core';
import { RoleService } from '../../../servces/role.service';
import { Router } from '@angular/router';
import { Role } from '../../../servces/models/role';
import { AuthenticationService } from '../../../servces/auth.service';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../../roles/update/update.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIcon, MatCardModule, RouterLink, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

  constructor(
    private roleService: RoleService,
    private router: Router,
    public authService: AuthenticationService,
    public dialog: MatDialog
  ) { }


  roles: Role[] = [];
  displayedColumns: string[] = ['name', 'accesLevel', 'actions'];
  dataSource = new MatTableDataSource<Role>();

  ngOnInit() {
    this.loadRoles();
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<Role>(this.roles);
  }


  loadRoles() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      this.initializeDataSource();
      console.log(this.roles);
    });
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.loadRoles();
    },
    error => {
      console.log(error);
      alert('delete failed, make sure there are no linked users or check your access level');
    });
  }

  updateRole(role: Role) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: role
    });
    dialogRef.afterClosed().subscribe(result => {
      this.roleService.updateRole(result).subscribe(() => {
        this.loadRoles();
      });
    });
  }



}
