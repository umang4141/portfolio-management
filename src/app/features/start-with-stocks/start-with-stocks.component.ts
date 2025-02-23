import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-start-with-stocks',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './start-with-stocks.component.html',
  styleUrls: ['./start-with-stocks.component.css']
})
export class StartWithStocksComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'],
    datasets: [
      { data: [300, 500, 100, 200, 400], label: 'Stock Prices' }
    ]
  };

  public barChartType: ChartType = 'bar';

  ngOnInit(): void {
    // Any initialization logic can go here
  }
}