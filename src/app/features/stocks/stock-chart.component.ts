import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="{ 'dark-theme': isDarkTheme }">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [`
    div {
      display: block;
      width: 100%;
      height: 400px;
      padding: 1rem;
      border-radius: 8px;
      background: white;
      transition: all 0.3s ease;
    }
    
    div.dark-theme {
      background: #1a1a1a;
    }
  `],
})
export class StockChartComponent implements OnChanges {
  @Input() stocks: any[] | null = null;
  @Input() isDarkTheme = false;
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
              borderColor: this.isDarkTheme ? '#90cdf4' : '#3e95cd',
              backgroundColor: this.isDarkTheme 
                ? 'rgba(144, 205, 244, 0.1)' 
                : 'rgba(62, 149, 205, 0.1)',
              tension: 0.3,
              pointRadius: 6,
              pointBackgroundColor: this.isDarkTheme ? '#90cdf4' : '#3e95cd',
              pointBorderColor: this.isDarkTheme ? '#1a1a1a' : '#fff',
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
              color: this.isDarkTheme ? '#ffffff' : '#1a1a1a'
            },
            legend: {
              position: 'top',
              labels: {
                color: this.isDarkTheme ? '#ffffff' : '#1a1a1a'
              }
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Price (USD)',
                color: this.isDarkTheme ? '#ffffff' : '#1a1a1a'
              },
              grid: {
                color: this.isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                color: this.isDarkTheme ? '#ffffff' : '#1a1a1a'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Company Symbol',
                color: this.isDarkTheme ? '#ffffff' : '#1a1a1a'
              },
              grid: {
                color: this.isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                color: this.isDarkTheme ? '#ffffff' : '#1a1a1a'
              }
            },
          },
        },
      });
    }
  }
}
