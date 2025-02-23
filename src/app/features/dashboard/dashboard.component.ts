import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PortfolioService } from '../../core/services/portfolio.service';
import { 
  PortfolioSummary,
  StockHolding,
  FilterConfig,
  PaginationConfig 
} from '../../core/models/portfolio.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() isDarkTheme = false;
  portfolioSummary: PortfolioSummary | null = null;
  paginatedHoldings: StockHolding[] = [];
  isLoading = true;
  Math = Math; // Add Math property for template
  
  filterConfig: FilterConfig = {
    symbol: '',
    sortBy: 'symbol',
    sortDirection: 'asc'
  };
  
  pagination: PaginationConfig = {
    pageSize: 5,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private portfolioService: PortfolioService
  ) {}

  // Add navigation methods
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

  // Existing methods
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.loadPortfolioData();
    }
  }

  private loadPortfolioData(): void {
    this.isLoading = true;
    this.portfolioService.getPortfolioSummary().subscribe(
      summary => {
        this.portfolioSummary = summary;
        this.pagination.totalItems = summary.holdings.length;
        this.applyFilters();
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    if (!this.portfolioSummary) return;

    let filteredHoldings = [...this.portfolioSummary.holdings];

    if (this.filterConfig.symbol) {
      filteredHoldings = filteredHoldings.filter(holding => 
        holding.symbol.toLowerCase().includes(this.filterConfig.symbol!.toLowerCase())
      );
    }

    filteredHoldings.sort((a, b) => {
      const direction = this.filterConfig.sortDirection === 'asc' ? 1 : -1;
      switch (this.filterConfig.sortBy) {
        case 'value':
          return (a.currentPrice * a.quantity - b.currentPrice * b.quantity) * direction;
        case 'profit':
          return ((a.currentPrice - a.purchasePrice) * a.quantity - 
                 (b.currentPrice - b.purchasePrice) * b.quantity) * direction;
        default:
          return a.symbol.localeCompare(b.symbol) * direction;
      }
    });

    const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
    this.paginatedHoldings = filteredHoldings.slice(
      startIndex, 
      startIndex + this.pagination.pageSize
    );
  }

  changePage(page: number): void {
    this.pagination.currentPage = page;
    this.applyFilters();
  }

  toggleSortDirection(): void {
    this.filterConfig.sortDirection = 
      this.filterConfig.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
