import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Location } from '../../../servces/models/location';
import { LocationService } from '../../../servces/location.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-update-location',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatLabel],
  templateUrl: './update-location.component.html',
  styleUrl: './update-location.component.scss'
})
export class UpdateLocationComponent {
  editedLocation: Location;
  constructor(
    public dialogRef: MatDialogRef<UpdateLocationComponent>,
    private locationService: LocationService,
    @Inject(MAT_DIALOG_DATA) public data: { location: Location }
  ) {
    // Clone the location to avoid modifying the original data directly
    this.editedLocation = { ...data.location };
    console.log(this.editedLocation);
  }
}
