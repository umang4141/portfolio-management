import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockHolding, PortfolioSummary } from '../models/portfolio.interface';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiKey = 'cutb2k1r01qrsirlpjt0cutb2k1r01qrsirlpjtg';
  private mockHoldings: StockHolding[] = [
    { symbol: 'AAPL', quantity: 10, purchasePrice: 150.0, currentPrice: 0 },
    { symbol: 'GOOGL', quantity: 5, purchasePrice: 2800.0, currentPrice: 0 },
    { symbol: 'MSFT', quantity: 15, purchasePrice: 280.0, currentPrice: 0 },
  ];

  private portfolioSummary = new BehaviorSubject<PortfolioSummary>({
    totalInvestment: 0,
    currentValue: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    holdings: [],
  });

  constructor(private http: HttpClient) {
    this.updatePortfolioValues();
  }

  getPortfolioSummary(): Observable<PortfolioSummary> {
    return this.portfolioSummary.asObservable();
  }

  private async updatePortfolioValues() {
    try {
      const updatedHoldings = await Promise.all(
        this.mockHoldings.map(async (holding) => {
          const response = await this.http
            .get<any>(
              `https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${this.apiKey}`
            )
            .toPromise();

          return {
            ...holding,
            currentPrice: response.c,
          };
        })
      );

      const summary = this.calculatePortfolioSummary(updatedHoldings);
      this.portfolioSummary.next(summary);
    } catch (error) {
      console.error('Error updating portfolio values:', error);
    }
  }

  private calculatePortfolioSummary(
    holdings: StockHolding[]
  ): PortfolioSummary {
    const totalInvestment = holdings.reduce(
      (sum, holding) => sum + holding.purchasePrice * holding.quantity,
      0
    );

    const currentValue = holdings.reduce(
      (sum, holding) => sum + holding.currentPrice * holding.quantity,
      0
    );

    const profitLoss = currentValue - totalInvestment;
    const profitLossPercentage = (profitLoss / totalInvestment) * 100;

    return {
      totalInvestment,
      currentValue,
      profitLoss,
      profitLossPercentage,
      holdings,
    };
  }
}
