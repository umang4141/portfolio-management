import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portfolio-container">
      <h1>Portfolio</h1>
      <p>Your portfolio content will go here</p>
    </div>
  `,
  styles: [
    `
      .portfolio-container {
        padding: 2rem;
      }
    `,
  ],
})
export class PortfolioComponent {}
