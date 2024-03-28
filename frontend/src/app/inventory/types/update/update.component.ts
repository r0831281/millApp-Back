import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ItemType } from '../../../servces/models/item-type';
import { TypeService } from '../../../servces/type.service';
import { AuthenticationService } from '../../../servces/auth.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-update-type',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  editedType: ItemType;

  constructor(
    private typeService: TypeService,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemType: ItemType }
  ) {
    // Clone the type to avoid modifying the original data directly
    this.editedType = { ...data.itemType };
    console.log(this.editedType);
   }

}
