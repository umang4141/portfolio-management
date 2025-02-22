import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  template: `
    <div class="auth-container">
      <div class="background-overlay"></div>

      <div class="welcome-text">
        <h1>Welcome to Portfolio Management</h1>
        <p>Sign in to your account or create a new one</p>
      </div>

      <div class="auth-forms">
        <!-- Login Form -->
        <div class="form-box">
          <app-login></app-login>
        </div>

        <!-- Register Form -->
        <div class="form-box">
          <app-register></app-register>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        position: relative;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('/assets/images/portfolio-bg.jpg') center/cover;
        opacity: 0.1;
      }

      .welcome-text {
        text-align: center;
        color: white;
        margin-bottom: 2rem;
        position: relative;
        z-index: 1;
      }

      .welcome-text h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }

      .welcome-text p {
        font-size: 1.25rem;
        opacity: 0.9;
      }

      .auth-forms {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        width: 100%;
        max-width: 1200px;
        position: relative;
        z-index: 1;
      }

      .form-box {
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }

      @media (max-width: 768px) {
        .auth-forms {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AuthComponent {}
