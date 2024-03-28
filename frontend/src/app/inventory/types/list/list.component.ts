import { Component } from '@angular/core';
import { ItemType } from '../../../servces/models/item-type';
import { TypeService } from '../../../servces/type.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent as TypeUpdateComponent} from '../update/update.component';
import { AuthenticationService } from '../../../servces/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButtonModule , MatCardModule, RouterLink,MatFormFieldModule, MatInputModule,FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'Bulk', 'actions'];
  types: ItemType[] = [];
  dataSource = new MatTableDataSource<ItemType>(this.types);
  enteredData: string = '';

  constructor(
    private typeService: TypeService,
    public dialog: MatDialog,
    public authService: AuthenticationService
    ) { }

  deleteType(id: number) {
    this.typeService.deleteType(id).subscribe(() => {
      this.loadTypes();
    });
  }

  ngOnInit() {
    this.loadTypes();
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<ItemType>(this.types);
  }

  loadTypes() {
    this.typeService.getTypes().subscribe(types => {
      this.types = types;
      this.types.sort((a, b) => a.name.localeCompare(b.name));
      this.initializeDataSource();
    });
  }

  applyFilter(event: KeyboardEvent) {
    this.dataSource.filter = this.enteredData.trim().toLowerCase();
  }

  delete(id: number) {
    this.typeService.deleteType(id).subscribe(() => {
      this.loadTypes();
    },
    error => {
      console.error('Error deleting type:', error);
      alert('Error deleting type, make sure there is no linked item to this type');
    }
  );
  }


  openDialog(itemType: ItemType): void {
    const dialogRef = this.dialog.open(TypeUpdateComponent, {
      width: '400px',
      data: {itemType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.typeService.updateType(result).subscribe(() => {
          this.loadTypes();
        });
      }
      this.loadTypes();
    });
  }

}
