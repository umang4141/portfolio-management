import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StockChartComponent } from './stock-chart.component';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, HttpClientModule, StockChartComponent],
  template: `
    <div class="stocks-container">
      <h1>Live Stock Data</h1>
      <app-stock-chart [stocks]="stocks"></app-stock-chart>
    </div>
  `,
  styles: [
    `
      .stocks-container {
        padding: 2rem;
      }
    `,
  ],
})
export class StocksComponent implements OnInit {
  stocks: any[] | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStockData();
  }

  fetchStockData(): void {
    const apiKey = 'cutb2k1r01qrsirlpjt0cutb2k1r01qrsirlpjtg';
    const symbols = [
      'AAPL', // Apple
      'GOOGL', // Google
      'MSFT', // Microsoft
      'AMZN', // Amazon
      'META', // Meta (Facebook)
      'TSLA', // Tesla
      'NVDA', // NVIDIA
      'JPM', // JPMorgan Chase
      'BAC', // Bank of America
      'WMT', // Walmart
    ];

    Promise.all(
      symbols.map((symbol) =>
        this.http
          .get<any>(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
          )
          .toPromise()
          .catch((error) => {
            console.error(`Error fetching ${symbol}:`, error);
            return null;
          })
      )
    ).then((responses) => {
      this.stocks = responses
        .map((data, index) => {
          if (!data) return null;
          return {
            name: symbols[index],
            price: parseFloat(data.c).toFixed(2), // Format to 2 decimal places
          };
        })
        .filter((stock) => stock !== null);
    });
  }
}
