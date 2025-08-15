import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { Student } from '../models/student.model';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h2>Welcome to Student Management System</h2>
        <p>Manage your students and courses efficiently</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>{{ studentsCount }}</h3>
            <p>Total Students</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-content">
            <h3>{{ coursesCount }}</h3>
            <p>Total Courses</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>{{ activeCoursesCount }}</h3>
            <p>Active Courses</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <h3>{{ totalEnrollments }}</h3>
            <p>Total Enrollments</p>
          </div>
        </div>
      </div>
      
      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="action-buttons">
          <a routerLink="/students/new" class="action-btn primary">
            <span>➕</span>
            Add New Student
          </a>
          <a routerLink="/courses/new" class="action-btn secondary">
            <span>📖</span>
            Add New Course
          </a>
          <a routerLink="/students" class="action-btn tertiary">
            <span>👥</span>
            View All Students
          </a>
          <a routerLink="/courses" class="action-btn quaternary">
            <span>📚</span>
            View All Courses
          </a>
          <a routerLink="/enrollments" class="action-btn quinary">
            <span>🎯</span>
            Manage Enrollments
          </a>
        </div>
      </div>
      
      <div class="recent-section">
        <div class="recent-students">
          <h3>Recent Students</h3>
          <div class="recent-list">
            <div *ngFor="let student of recentStudents" class="recent-item">
              <div class="item-avatar">{{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}</div>
              <div class="item-info">
                <h4>{{ student.firstName }} {{ student.lastName }}</h4>
                <p>{{ student.email }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="recent-courses">
          <h3>Recent Courses</h3>
          <div class="recent-list">
            <div *ngFor="let course of recentCourses" class="recent-item">
              <div class="item-avatar">{{ course.courseCode }}</div>
              <div class="item-info">
                <h4>{{ course.courseName }}</h4>
                <p>{{ course.credits }} credits {{ course.price }}</p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
      color: white;
    }
    
    .welcome-section h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 300;
    }
    
    .welcome-section p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .stat-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
    }
    
    .stat-icon {
      font-size: 3rem;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      color: white;
    }
    
    .stat-content h3 {
      font-size: 2.5rem;
      margin: 0;
      color: #333;
      font-weight: 700;
    }
    
    .stat-content p {
      margin: 0;
      color: #666;
      font-size: 1.1rem;
    }
    
    .quick-actions {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 3rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .quick-actions h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }
    
    .action-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      text-align: center;
      justify-content: center;
    }
    
    .action-btn.primary {
      background: #667eea;
      color: white;
    }
    
    .action-btn.secondary {
      background: #764ba2;
      color: white;
    }
    
    .action-btn.tertiary {
      background: #f093fb;
      color: white;
    }
    
    .action-btn.quaternary {
      background: #4facfe;
      color: white;
    }
    
    .action-btn.quinary {
      background: #ff9a9e;
      color: white;
    }
    
    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }
    
    .recent-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }
    
    .recent-students, .recent-courses {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .recent-students h3, .recent-courses h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }
    
    .recent-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .recent-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: #f8f9fa;
      transition: background 0.3s ease;
    }
    
    .recent-item:hover {
      background: #e9ecef;
    }
    
    .item-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .item-info h4 {
      margin: 0 0 0.25rem 0;
      color: #333;
      font-size: 1.1rem;
    }
    
    .item-info p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .action-buttons {
        grid-template-columns: 1fr;
      }
      
      .recent-section {
        grid-template-columns: 1fr;
      }
      
      .welcome-section h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  studentsCount = 0;
  coursesCount = 0;
  activeCoursesCount = 0;
  totalEnrollments = 0;
  recentStudents: Student[] = [];
  recentCourses: Course[] = [];
  
  constructor(
    private studentService: StudentService,
    private courseService: CourseService
  ) {}
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  private loadDashboardData(): void {
    // Load students
    this.studentService.getStudents().subscribe(students => {
      this.studentsCount = students.length;
      this.recentStudents = students.slice(0, 5);
      this.calculateTotalEnrollments(students);
    });
    
    // Load courses
    this.courseService.getCourses().subscribe(courses => {
      this.coursesCount = courses.length;
      this.recentCourses = courses.slice(0, 5);
    });
    
    // Load active courses
    this.courseService.getActiveCourses().subscribe(activeCourses => {
      this.activeCoursesCount = activeCourses.length;
    });
  }
  
  private calculateTotalEnrollments(students: Student[]): void {
    this.totalEnrollments = students.reduce((total, student) => {
      return total + (student.courseIds?.length || 0);
    }, 0);
  }
}
