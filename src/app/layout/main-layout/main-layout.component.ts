import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="main-content">
        <app-sidebar></app-sidebar>
        <div class="content-area">
          <h1>Welcome to your portfolio</h1>
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .main-content {
        display: flex;
        flex: 1;
        margin-top: 64px;
        margin-bottom: 60px;
      }

      .content-area {
        flex: 1;
        padding: 2rem;
        background: #f8fafc;
        overflow-y: auto;
      }

      .content-area h1 {
        text-align: center;
        margin-top: 2rem;
        font-size: 2rem;
        color: #333;
      }
    `,
  ],
})
export class MainLayoutComponent {}
