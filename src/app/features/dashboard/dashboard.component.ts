import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { PortfolioSummary } from '../../core/models/portfolio.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div *ngIf="authService.isLoggedIn()" class="portfolio-summary">
        <h2>Portfolio Summary</h2>
        @if (portfolioSummary) {
          <div class="summary-grid">
            <div class="summary-card">
              <h3>Total Investment</h3>
              <p class="value">\${{ portfolioSummary.totalInvestment | number:'1.2-2' }}</p>
            </div>
            <div class="summary-card">
              <h3>Current Value</h3>
              <p class="value">\${{ portfolioSummary.currentValue | number:'1.2-2' }}</p>
            </div>
            <div class="summary-card">
              <h3>Profit/Loss</h3>
              <p class="value" [class.profit]="portfolioSummary.profitLoss > 0" 
                             [class.loss]="portfolioSummary.profitLoss < 0">
                \${{ portfolioSummary.profitLoss | number:'1.2-2' }}
                ({{ portfolioSummary.profitLossPercentage | number:'1.2-2' }}%)
              </p>
            </div>
          </div>

          <div class="holdings-table">
            <h3>Your Holdings</h3>
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Purchase Price</th>
                  <th>Current Price</th>
                  <th>Total Value</th>
                  <th>Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                @for (holding of portfolioSummary.holdings; track holding.symbol) {
                  <tr>
                    <td>{{ holding.symbol }}</td>
                    <td>{{ holding.quantity }}</td>
                    <td>\${{ holding.purchasePrice | number:'1.2-2' }}</td>
                    <td>\${{ holding.currentPrice | number:'1.2-2' }}</td>
                    <td>\${{ holding.currentPrice * holding.quantity | number:'1.2-2' }}</td>
                    <td [class.profit]="(holding.currentPrice - holding.purchasePrice) * holding.quantity > 0"
                        [class.loss]="(holding.currentPrice - holding.purchasePrice) * holding.quantity < 0">
                      \${{ (holding.currentPrice - holding.purchasePrice) * holding.quantity | number:'1.2-2' }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
    }

    .portfolio-summary {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 1rem 0 2rem;
    }

    .summary-card {
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: center;
    }

    .value {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .profit { 
      color: #28a745; 
    }
    
    .loss { 
      color: #dc3545; 
    }

    .holdings-table {
      margin-top: 2rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }

    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
  `]
})
export class DashboardComponent implements OnInit {
  portfolioSummary: PortfolioSummary | null = null;

  constructor(
    public authService: AuthService,
    private router: Router,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.portfolioService.getPortfolioSummary().subscribe(
        summary => this.portfolioSummary = summary
      );
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  getUsername(): string | null {
    const user = this.authService.currentUserSubject.value;
    return user ? user.username : null;
  }
}
