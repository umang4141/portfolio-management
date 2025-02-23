export interface StockHolding {
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

export interface PortfolioSummary {
  totalInvestment: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  holdings: StockHolding[];
}

export interface FilterConfig {
  symbol?: string;
  sortBy?: 'symbol' | 'value' | 'profit';
  sortDirection?: 'asc' | 'desc';
}

export interface PaginationConfig {
  pageSize: number;
  currentPage: number;
  totalItems: number;
}
