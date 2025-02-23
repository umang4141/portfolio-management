import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <header class="hero-section">
        <nav class="navbar">
          <div class="logo">Portfolio Manager</div>
          <div class="auth-buttons">
            <button class="btn login-btn" (click)="navigateToLogin()">Sign In</button>
            <button class="btn register-btn" (click)="navigateToRegister()">Sign Up</button>
          </div>
        </nav>
        <div class="hero-content">
          <h1>Manage Your Portfolio Like a Pro</h1>
          <p>Track, analyze, and optimize your investments in one place</p>
        </div>
      </header>

      <!-- Features Section -->
      <section class="features">
        <h2>Key Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <i class="fas fa-chart-line"></i>
            <h3>Portfolio Tracking</h3>
            <p>Real-time monitoring of your investments</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-analytics"></i>
            <h3>Advanced Analytics</h3>
            <p>Detailed insights and performance metrics</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-shield-alt"></i>
            <h3>Secure Platform</h3>
            <p>Enterprise-grade security for your data</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <h2>Start Managing Your Portfolio Today</h2>
        <p>Join thousands of investors who trust our platform</p>
        <button class="btn cta-btn" (click)="navigateToRegister()">Get Started</button>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 5%;
      text-align: center;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .auth-buttons {
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .login-btn {
      background: transparent;
      border: 1px solid white;
      color: white;
    }

    .register-btn, .cta-btn {
      background: #667eea;
      border: none;
      color: white;
    }

    .features {
      padding: 4rem 5%;
      text-align: center;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .cta-section {
      background: #2c3e50;
      color: white;
      padding: 4rem 5%;
      text-align: center;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}