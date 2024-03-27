import { Component } from '@angular/core';
import { RoleService } from '../../../servces/role.service';
import { Router } from '@angular/router';
import { Role } from '../../../servces/models/role';
import { AuthenticationService } from '../../../servces/auth.service';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

  constructor(
    private roleService: RoleService,
    private router: Router,
    private authservice: AuthenticationService,
    public dialog: MatDialog
  ) { }

  roles: Role[] = [];

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(() => {
      this.loadRoles();
    });



  }



}
