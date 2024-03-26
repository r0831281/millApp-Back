import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Location } from '../../../servces/models/location';
import { LocationService } from '../../../servces/location.service';
import { MatTableModule } from '@angular/material/table';
import { ItemType } from '../../../servces/models/item-type';
import { TypeService } from '../../../servces/type.service';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Item } from '../../../servces/models/item.model';
import { ItemService } from '../../../servces/item.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';






@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIcon, MatButtonModule, RouterLink,NgIf, MatFormFieldModule, MatSelectModule, FormsModule, NgFor, MatDatepickerModule,MatInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  constructor(
    private locationService: LocationService,
    private typeService: TypeService,
    private itemService: ItemService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  locations = [] as Location[];
  types = [] as ItemType[];
  item: any = {
    id: 0,
    name: '',
    description: '',
    code: '',
    ItemTypes_id : 0,
    ItemLocation_id: 0
  };

  ngOnInit() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });

    this.typeService.getTypes().subscribe(types => {
      this.types = types;
    });
  }

  saveItem() {
    console.log(this.item);
    this.item.date_inservice = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 365);
    this.item.date_outservice = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    this.item.date_scanned = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.itemService.createItem(this.item).subscribe(() => {
      this.router.navigate(['/inventory/items/list']);
    });
  }


}
