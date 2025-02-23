import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StockListComponent } from './stock-list.component';
import { StockChartComponent } from './stock-chart.component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, HttpClientModule, StockListComponent],
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit, OnDestroy {
  @Input() isDarkTheme = false;
  stocks: any[] | null = null;
  isLoading = true;
  private subscription: Subscription | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStockData();
    this.subscription = interval(10000).subscribe(() => this.fetchStockData()); // Update every 10 seconds
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchStockData(): void {
    const apiKey = 'cutb2k1r01qrsirlpjt0cutb2k1r01qrsirlpjtg';
    const symbols = [
      'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'BAC', 'WMT',
      'NFLX', 'DIS', 'NKE', 'V', 'MA', 'PYPL', 'INTC', 'CSCO', 'ORCL', 'IBM',
      'ADBE', 'CRM', 'AMD', 'QCOM', 'TXN', 'AVGO', 'MU', 'LRCX', 'AMAT', 'KLAC'
    ];

    this.isLoading = true;
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
            change: parseFloat(data.d).toFixed(2), // Change in price
          };
        })
        .filter((stock) => stock !== null);
      this.isLoading = false;
    });
  }
}
