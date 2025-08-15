import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface BackendVersionInfo {
  version: string;
  buildDate: string;
  javaVersion: string;
  springBootVersion: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  
  private backendVersion: string = '1.0.0'; // Fallback version
  private backendBuildDate: string = new Date().toLocaleDateString(); // Fallback date
  private backendVersionInfo: BackendVersionInfo | null = null;
  
  constructor(private http: HttpClient) {
    this.loadBackendVersion();
  }
  
  getAppVersion(): string {
    return '1.0.0';
  }
  
  getBackendVersion(): string {
    return this.backendVersion;
  }
  
  getBackendBuildDate(): string {
    return this.backendBuildDate;
  }
  
  getBackendVersionInfo(): BackendVersionInfo | null {
    return this.backendVersionInfo;
  }
  
  getFullVersionInfo(): { frontend: string; backend: string; buildDate: string } {
    return {
      frontend: this.getAppVersion(),
      backend: this.getBackendVersion(),
      buildDate: this.getBackendBuildDate()
    };
  }
  
  private loadBackendVersion(): void {
    this.http.get<BackendVersionInfo>('http://localhost:8080/api/version')
      .pipe(
        catchError(error => {
          console.warn('Could not fetch backend version:', error);
          return of(null);
        })
      )
      .subscribe(versionInfo => {
        if (versionInfo) {
          this.backendVersion = versionInfo.version;
          this.backendBuildDate = versionInfo.buildDate;
          this.backendVersionInfo = versionInfo;
        }
      });
  }
  
  // Method to manually refresh backend version
  refreshBackendVersion(): Observable<BackendVersionInfo | null> {
    return this.http.get<BackendVersionInfo>('http://localhost:8080/api/version')
      .pipe(
        catchError(error => {
          console.warn('Could not fetch backend version:', error);
          return of(null);
        })
      );
  }
}
