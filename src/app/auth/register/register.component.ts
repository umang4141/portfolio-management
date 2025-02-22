import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="background-overlay"></div>

      <button class="btn-home" (click)="navigateToHome()">
        <i class="fas fa-home"></i> Return to Home
      </button>

      <div class="welcome-text">
        <h1>Welcome to Portfolio Management</h1>
        <p>Create your account to start managing your investments</p>
      </div>

      <div class="register-box">
        <h2>Create Account</h2>
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="user.username"
              required
              minlength="3"
              #usernameInput="ngModel"
              [class.is-invalid]="
                usernameInput.invalid && usernameInput.touched
              "
            />
            <small
              *ngIf="usernameInput.invalid && usernameInput.touched"
              class="error-text"
              >Username must be at least 3 characters</small
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="user.email"
              required
              email
              #emailInput="ngModel"
              [class.is-invalid]="emailInput.invalid && emailInput.touched"
            />
            <small
              *ngIf="emailInput.invalid && emailInput.touched"
              class="error-text"
              >Please enter a valid email</small
            >
          </div>

          <div class="form-group">
            <label for="role">Select Role</label>
            <select
              id="role"
              name="role"
              [(ngModel)]="user.role"
              required
              class="role-select"
            >
              <option *ngFor="let role of roles" [value]="role.value">
                {{ role.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="user.password"
              required
              minlength="6"
              #passwordInput="ngModel"
              [class.is-invalid]="
                passwordInput.invalid && passwordInput.touched
              "
            />
            <small
              *ngIf="passwordInput.invalid && passwordInput.touched"
              class="error-text"
              >Password must be at least 6 characters</small
            >
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              [(ngModel)]="user.confirmPassword"
              required
              #confirmPasswordInput="ngModel"
              [class.is-invalid]="
                confirmPasswordInput.invalid && confirmPasswordInput.touched
              "
            />
          </div>

          <div *ngIf="error" class="error-message">{{ error }}</div>

          <button
            type="submit"
            [disabled]="registerForm.invalid || isLoading"
            class="submit-btn"
          >
            <span *ngIf="isLoading">Creating Account...</span>
            <span *ngIf="!isLoading">Create Account</span>
          </button>
        </form>

        <div class="login-link">
          Already have an account? <a routerLink="/auth/login">Sign In</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .register-container {
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
        background-image: url('/assets/images/portfolio-bg.jpg');
        background-size: cover;
        background-position: center;
        opacity: 0.1;
      }

      .btn-home {
        position: fixed;
        top: 2rem;
        left: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
        z-index: 1000;
      }

      .btn-home:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateX(-2px);
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

      .register-box {
        background: rgba(255, 255, 255, 0.95);
        padding: 2.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 480px;
        position: relative;
        z-index: 1;
      }

      h2 {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 2rem;
        font-size: 1.75rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #4a5568;
        font-weight: 500;
      }

      input,
      select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 1rem;
        transition: all 0.3s ease;
      }

      input:focus,
      select:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      input.is-invalid {
        border-color: #e53e3e;
      }

      .error-text {
        color: #e53e3e;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .error-message {
        background-color: #fff5f5;
        color: #e53e3e;
        padding: 0.75rem;
        border-radius: 6px;
        margin-bottom: 1rem;
        text-align: center;
      }

      .submit-btn {
        width: 100%;
        padding: 0.875rem;
        background-color: #667eea;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .submit-btn:hover:not(:disabled) {
        background-color: #5a67d8;
        transform: translateY(-1px);
      }

      .submit-btn:disabled {
        background-color: #a0aec0;
        cursor: not-allowed;
      }

      .login-link {
        text-align: center;
        margin-top: 1.5rem;
        color: #4a5568;
      }

      .login-link a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
      }

      .login-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  };

  roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'Regular User' },
    { value: 'guest', label: 'Guest User' },
  ];

  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService
      .register({
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
      })
      .subscribe({
        next: () => {
          // Registration successful - redirect to login
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.error = err;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
