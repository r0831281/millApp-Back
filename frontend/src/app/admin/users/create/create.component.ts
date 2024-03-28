import { Component } from '@angular/core';
import { RoleService } from '../../../servces/role.service';
import { UserService } from '../../../servces/user.service';
import { UserOut } from '../../../servces/models/user';
import { Role } from '../../../servces/models/role';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelect, NgForOf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  roles: Role[] = [];
  user: UserOut = {
    id: 0,
    name: '',
    password: '',
    UserRole: 0
  };

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
      console.log('Roles: ', this.roles);
    });
  }

  createUser() {
    this.userService.createUser(this.user).subscribe(() => {
      console.log('User created successfully');
      this.router.navigate(['/admin/users'])
    });
  }

}
