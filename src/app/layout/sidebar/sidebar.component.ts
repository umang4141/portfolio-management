import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  menuItems = [
    { icon: 'fas fa-chart-line', label: 'Dashboard', route: '/app/dashboard' },
    { icon: 'fas fa-wallet', label: 'Portfolio', route: '/app/portfolio' },
    { icon: 'fas fa-chart-pie', label: 'Analytics', route: '/app/analytics' },
    { icon: 'fas fa-chart-bar', label: 'Stocks', route: '/app/stocks' },
    { icon: 'fas fa-cog', label: 'Settings', route: '/app/settings' },
  ];

  constructor(public router: Router) {}

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
