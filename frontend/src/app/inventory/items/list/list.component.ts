import { Component, OnInit, ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemService } from '../../../servces/item.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { Item } from '../../../servces/models/item.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { UpdateComponent } from '../update/update.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Location } from '../../../servces/models/location';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, MatCardModule, RouterLink, MatTableModule, MatPaginatorModule, UpdateComponent, MatIcon, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  items: Item[] = [];
  locations: Location[] = [];
  enteredData: string = '';
  dataSource = new MatTableDataSource<Item>(this.items);
  displayedColumns: string[] = ['id', 'name', 'location' , 'description', 'code', 'date_inservice', 'date_outservice', 'date_scanned', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private itemService: ItemService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.initializeDataSource();
    });
  }

  applyFilter(event: KeyboardEvent) {
    this.enteredData = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.enteredData.trim().toLowerCase();
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<Item>(this.items);
    this.dataSource.paginator = this.paginator;
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
      this.initializeDataSource();
    });
  }

  openDialog(item: Item) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: { item },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        result.date_inservice = this.datePipe.transform(result.date_inservice, 'yyyy-MM-dd');
        result.date_outservice = this.datePipe.transform(result.date_outservice, 'yyyy-MM-dd');
        result.ItemLocation_id = result.ItemLocation.id;
        result.ItemTypes_id = result.ItemTypes.id;

        this.itemService.updateItem(result).subscribe(() => {
          this.items = this.items.map(item => {
            if (item.id === result.id) {
              return result;
            }
            return item;
          });
          this.loadItems();
        }, (error) => {
          console.error('An error occurred:', error);
          alert('Failed to update item. Please try again.');
        }
        );
      }
    });
  }
}
