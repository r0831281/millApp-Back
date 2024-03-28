import { Component, OnInit, ViewChild } from '@angular/core';
import { UserItemService } from '../../../servces/user-item.service';
import { UserItemIn, UserItemOut } from '../../../servces/models/user-item';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { UpdateComponent } from '../../user/update/update.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, RouterLink, MatButtonModule, MatIcon],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  userItems: UserItemIn[] = [];
  dataSource = new MatTableDataSource<UserItemIn>(this.userItems);
  displayedColumns: string[] = ['id', 'user', 'item', 'actions'];

  constructor(
    private userItemService: UserItemService,
    public dialog: MatDialog,
    ) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadUserItems();
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource<UserItemIn>(this.userItems);
    this.dataSource.paginator = this.paginator;
  }

  loadUserItems() {
    this.userItemService.getUserItems().subscribe(userItems => {
      this.userItems = userItems;
      this.initializeDataSource();
      console.log(this.userItems);
    });
  }

  deleteItem(id: number) {
    this.userItemService.deleteUserItem(id).subscribe(() => {
      this.loadUserItems();
    });
  }

  openDialog(item: UserItemOut) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '250px',
      data: {item}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userItemService.updateUserItem(result).subscribe(() => {
          this.loadUserItems();
        });
        this.loadUserItems();
      }
    });
  }


}
