import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-start-with-stocks',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './start-with-stocks.component.html',
  styleUrls: ['./start-with-stocks.component.css']
})
export class StartWithStocksComponent {
  public pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public pieChartData = {
    labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'],
    datasets: [{
      data: [300, 500, 100, 200, 400],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ]
    }]
  };

  public lineChartData = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'AAPL',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        tension: 0.5
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'GOOGL',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        tension: 0.5
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };

  public lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };
}