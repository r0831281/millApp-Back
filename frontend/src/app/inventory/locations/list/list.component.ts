import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LocationService } from '../../../servces/location.service';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { Location } from '../../../servces/models/location';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UpdateLocationComponent } from '../update-location/update-location.component';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, RouterLink, MatButtonModule, MatTableModule, MatIcon, MatPaginatorModule, MatDialogModule, MatFormField, FormsModule, MatInputModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  locations = [] as Location[];
  displayedColumns: string[] = ['name', 'shortname', 'address', 'city', 'actions'];
  dataSource = new MatTableDataSource<Location>();
  enteredData: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
      this.initializeDataSource();
    });
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<Location>(this.locations);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: KeyboardEvent) {
    this.enteredData = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.enteredData.trim().toLowerCase();
  }

  deleteLocation(id: number) {
    this.locationService.deleteLocation(id).subscribe(
      () => {
        this.locations = this.locations.filter(location => location.id !== id);
        this.initializeDataSource();
      },
      (error) => {
        if (error.status === 500) {
          // Handle 500 Internal Server Error
          // Show a message to the user
          alert('Failed to delete location. The location may be protected in the database. (existing relationships) Please remove the relationships and try again.');
        } else {
          // For other errors, log the error or handle them accordingly
          console.error('An error occurred:', error);
        }
      }
    );
  }

  openDialog(location: Location) {
    const dialogRef = this.dialog.open(UpdateLocationComponent, {
      data: { location },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.updateLocation(result).subscribe(() => {
          this.locations = this.locations.map(location => {
            if (location.id === result.id) {
              return result;
            }
            return location;
          });
          this.loadLocations();
        });
      }
    });

  }

}
