import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  message?: string;
  status?: string;
  timestamp?: string;
  service?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="card">
        <h2>Backend API Test</h2>
        <p>Click the buttons below to test the Spring Boot backend APIs:</p>
        
        <div class="button-group">
          <button 
            (click)="testHelloApi()" 
            [disabled]="loading"
            class="btn btn-primary">
            {{ loading ? 'Loading...' : 'Test Hello API' }}
          </button>
          
          <button 
            (click)="testHealthApi()" 
            [disabled]="loading"
            class="btn btn-secondary">
            {{ loading ? 'Loading...' : 'Test Health API' }}
          </button>
        </div>
        
        <div *ngIf="response" class="response-section">
          <h3>API Response:</h3>
          <pre class="response-json">{{ response | json }}</pre>
        </div>
        
        <div *ngIf="error" class="error-section">
          <h3>Error:</h3>
          <p class="error-message">{{ error }}</p>
        </div>
      </div>
      
      <div class="info-card">
        <h3>Backend Status</h3>
        <p><strong>URL:</strong> http://localhost:8080</p>
        <p><strong>Frontend:</strong> http://localhost:4200</p>
        <p><strong>CORS:</strong> Configured to allow frontend requests</p>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .card h2 {
      color: #333;
      margin-top: 0;
      margin-bottom: 1rem;
    }
    
    .button-group {
      display: flex;
      gap: 1rem;
      margin: 1.5rem 0;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .btn-primary {
      background: #667eea;
      color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
      background: #5a6fd8;
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background: #764ba2;
      color: white;
    }
    
    .btn-secondary:hover:not(:disabled) {
      background: #6a4190;
      transform: translateY(-2px);
    }
    
    .response-section, .error-section {
      margin-top: 2rem;
      padding: 1rem;
      border-radius: 8px;
    }
    
    .response-section {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
    }
    
    .error-section {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
    }
    
    .response-json {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }
    
    .error-message {
      color: #721c24;
      margin: 0;
    }
    
    .info-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    
    .info-card h3 {
      color: #333;
      margin-top: 0;
      margin-bottom: 1rem;
    }
    
    .info-card p {
      margin: 0.5rem 0;
      color: #666;
    }
    
    .info-card strong {
      color: #333;
    }
  `]
})
export class HomeComponent implements OnInit {
  response: ApiResponse | null = null;
  error: string | null = null;
  loading = false;
  
  private readonly apiBaseUrl = 'http://localhost:8080/api';
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {}
  
  testHelloApi(): void {
    this.callApi('/hello');
  }
  
  testHealthApi(): void {
    this.callApi('/health');
  }
  
  private callApi(endpoint: string): void {
    this.loading = true;
    this.error = null;
    this.response = null;
    
    this.http.get<ApiResponse>(`${this.apiBaseUrl}${endpoint}`)
      .subscribe({
        next: (data) => {
          this.response = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = `Failed to call API: ${err.message || 'Unknown error'}`;
          this.loading = false;
        }
      });
  }
}
