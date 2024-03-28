import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ItemService } from '../../../servces/item.service';


@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [ZXingScannerModule, NgIf],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.scss'
})
export class ScannerComponent implements OnInit{

  constructor(private itemService: ItemService) { }
  ismobile = false;
  ngOnInit(): void {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
      this.ismobile = true;
    }
  }

  onScanSuccess(event: any) {
    console.log(event);
    this.itemService.scanItem(event).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onScanError(event: any) {
    console.log(event);
  }

  onScanFailure(event: any) {
    console.log(event);
  }

  onScanComplete(event: any) {
    console.log(event);
  }


}
