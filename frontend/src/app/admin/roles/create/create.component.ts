import { Component, OnInit } from '@angular/core';
import { RoleOut } from '../../../servces/models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { RoleService } from '../../../servces/role.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatCardModule, MatError, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService
    ) { }

    roleForm: FormGroup = this.fb.group({
      name: ['', Validators.required],
      accessLevel: ['', [Validators.required, Validators.min(0), Validators.max(6)]]
    });

  ngOnInit(): void {
    this.roleForm.valueChanges.subscribe(console.log);
  }

  createRole() {
    if (this.roleForm.valid) {
      const role: RoleOut = {
        name: this.roleForm.value.name,
        accessLevel: this.roleForm.value.accessLevel
      };
      console.log(role);
      this.roleService.createRole(role).subscribe(
        (data) => {
          console.log(data);
          this.roleForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      console.log('Invalid form');
      this.roleForm.markAllAsTouched();
    }
  }

}
