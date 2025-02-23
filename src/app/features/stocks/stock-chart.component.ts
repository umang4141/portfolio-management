import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [
    `
      div {
        display: block;
        width: 100%;
        height: 400px;
      }
    `,
  ],
})
export class StockChartComponent implements OnChanges {
  @Input() stocks: any[] | null = null;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: Chart | null = null;

  ngOnChanges(): void {
    if (this.stocks && this.chartCanvas) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    if (ctx && this.stocks) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.stocks.map((stock) => stock.name),
          datasets: [
            {
              label: 'Stock Prices (USD)',
              data: this.stocks.map((stock) => stock.price),
              borderColor: '#3e95cd',
              backgroundColor: 'rgba(62, 149, 205, 0.1)',
              tension: 0.3,
              pointRadius: 6,
              pointBackgroundColor: '#3e95cd',
              pointBorderColor: '#fff',
              pointHoverRadius: 8,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Major Stock Prices Comparison',
              font: {
                size: 16,
                weight: 'bold',
              },
            },
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Price (USD)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Company Symbol',
              },
            },
          },
        },
      });
    }
  }
}
