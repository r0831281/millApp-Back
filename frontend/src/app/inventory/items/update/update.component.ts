import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import   { Item } from '../../../servces/models/item.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Location } from '../../../servces/models/location';
import { LocationService } from '../../../servces/location.service';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatDialogModule, MatDatepickerModule, MatInputModule, MatDatepickerModule, MatButton, MatOptionModule, NgFor, MatSelect],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  editedItem: Item;
  locations: Location[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    private locationService: LocationService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) {
    // Clone the item to avoid modifying the original data directly
    this.editedItem = { ...data.item };
    console.log(this.editedItem);
  }

  ngOnInit() {
    this.loadLocations();
  }
  close() {
    this.dialogRef.close();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

}
