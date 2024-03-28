import { Component } from '@angular/core';
import { User } from '../../../servces/models/user';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Role } from '../../../servces/models/role';
import { RoleService } from '../../../servces/role.service';
import { NgFor } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButton,  MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatDialogModule, NgFor, MatFormFieldModule, MatFormField, MatSelectModule, FormsModule, MatInputModule, MatButtonModule, MatButton],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit{
  roles: Role[] = [];
  editedUser: User;
  constructor(
    private roleService: RoleService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    console.log('Data: ', data);
    // Assign the user object to editedUser
    this.editedUser = data?.user;
    console.log('Edited user: ', this.editedUser);
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      console.log('Roles: ', this.roles);
    });
  }
}
