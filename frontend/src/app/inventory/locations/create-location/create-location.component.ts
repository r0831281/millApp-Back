import { Component } from '@angular/core';
import { Location } from '../../../servces/models/location';
import { LocationService } from '../../../servces/location.service';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-create-location',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.scss'
})
export class CreateLocationComponent implements OnInit {
  locationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private locationService: LocationService, public router : Router) { }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
      shortname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  saveLocation() {
    if (this.locationForm.invalid) {
      return;
    }

    const locationData: Location = {
      id: 0,
      name: this.locationForm.value.name,
      shortname: this.locationForm.value.shortname,
      address: this.locationForm.value.address,
      city: this.locationForm.value.city,
      state: this.locationForm.value.state,
      zip: this.locationForm.value.zip,
      country: this.locationForm.value.country
    };

    this.locationService.addLocation(locationData).subscribe({
      next: (data) => {
        console.log(data);
        this.locationForm.reset();
        this.router.navigate(['/inventory/locations/list']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
