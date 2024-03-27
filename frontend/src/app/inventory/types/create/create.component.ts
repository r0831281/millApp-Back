import { Component } from '@angular/core';
import { ItemType } from '../../../servces/models/item-type';
import { TypeService } from '../../../servces/type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../../servces/models/item.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { MatCardModule, MatCard, MatCardActions} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';




@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, NgIf, MatSlideToggleModule, MatInputModule, MatError, MatCardModule, MatCard, MatCardActions,MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {
  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private typeService: TypeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      subcategory: ['', Validators.nullValidator],
      quantity: [0, Validators.nullValidator],
      isbulk: [false, Validators.required]
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const itemData: ItemType = this.itemForm.value;
      if (itemData.isbulk) {
        this.typeService.createType(itemData).subscribe(
          (createdType: ItemType) => {
            this.typeService.bulkCreate(createdType.id, itemData.quantity).subscribe(
              (items: Item[]) => {
                this.itemForm.reset();
                this.snackBar.open('Type and bulk items created successfully', 'Close', {
                  duration: 3000
                });
                this.router.navigate(['/inventory/types']);
              },
              error => {
                this.snackBar.open('Error creating bulk items', 'Close', {
                  duration: 3000
                });
              }
            );
          },
          error => {
            this.snackBar.open('Error creating type', 'Close', {
              duration: 3000
            });
          }
        );
      }
      else {
        this.typeService.createType(itemData).subscribe(
          (createdType: ItemType) => {
            this.itemForm.reset();
            this.snackBar.open('Type created successfully', 'Close', {
              duration: 3000
            });
            this.router.navigate(['/inventory/types']);
          },
          error => {
            this.snackBar.open('Error creating type', 'Close', {
              duration: 3000
            });
          }
        );
      }
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000
      });
    }
  }
}
