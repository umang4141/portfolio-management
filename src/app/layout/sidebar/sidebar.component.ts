import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isDarkTheme = false;

  menuItems = [
    { icon: 'fas fa-chart-line', label: 'Dashboard', route: '/app/dashboard' },
    { icon: 'fas fa-wallet', label: 'Portfolio', route: '/app/portfolio' },
    { icon: 'fas fa-chart-bar', label: 'Watchlist', route: '/app/stocks' },
    { icon: 'fas fa-book', label: 'Start with Stocks', route: '/app/start-with-stocks' },
    { icon: 'fas fa-graduation-cap', label: 'How to Invest', route: '/app/how-to-invest' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/app/settings' }
  ];

  constructor(public router: Router) {}

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
