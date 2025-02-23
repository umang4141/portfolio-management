import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
})
export class StockListComponent implements OnChanges {
  @Input() stocks: any[] | null = null;

  ngOnChanges(): void {
    // Handle any changes to the stocks input
  }
}