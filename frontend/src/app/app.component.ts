import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Student Management System</h1>
        <nav class="nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
          <a routerLink="/students" routerLinkActive="active">Students</a>
          <a routerLink="/courses" routerLinkActive="active">Courses</a>
          <a routerLink="/enrollments" routerLinkActive="active">Enrollments</a>
        </nav>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .app-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .app-header h1 {
      color: white;
      margin: 0 0 1rem 0;
      font-size: 2rem;
      font-weight: 300;
      text-align: center;
    }
    
    .nav-menu {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
    
    .nav-menu a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .nav-menu a:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    .nav-menu a.active {
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .app-main {
      padding: 2rem;
    }
    
    @media (max-width: 768px) {
      .nav-menu {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
      
      .app-header h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'student-management-frontend';
}
