import { Component, Inject } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Location } from '../../../servces/models/location';
import { LocationService } from '../../../servces/location.service';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { UserItemIn, UserItemOut } from '../../../servces/models/user-item';
import { UserItemService } from '../../../servces/user-item.service';
import { UserService } from '../../../servces/user.service';
import { ItemService } from '../../../servces/item.service';
import { User, UserOut } from '../../../servces/models/user';
import { Item } from '../../../servces/models/item.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, FormsModule, MatInputModule, MatLabel, MatDialogModule, MatSelect, MatOptionModule, NgForOf, MatButton],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  editItem: UserItemIn;
  users: User[] = [];
  items: Item[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    private userItemService: UserItemService,
    private userService: UserService,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: { item: UserItemIn }
  ) {
    this.editItem = { ...data.item };
    console.log(this.editItem.id + " is being edited");
  }

  ngOnInit() {
    this.loadUsers();
    this.loadItems();
  }

  close() {
    this.dialogRef.close();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadItems() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }


}
