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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
