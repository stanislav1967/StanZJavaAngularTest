import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="course-list-container">
      <div class="header">
        <h2>Course Management</h2>
        <a routerLink="/courses/new" class="add-btn">📖 Add New Course</a>
      </div>
      
      <div class="search-section">
        <input 
          type="text" 
          placeholder="Search courses..." 
          class="search-input"
          (input)="onSearch($event)">
      </div>
      
      <div class="courses-grid">
        <div *ngFor="let course of courses" class="course-card">
          <div class="course-header">
            <div class="course-code">{{ course.courseCode }}</div>
            <div class="course-status" [class.active]="course.isActive">
              {{ course.isActive ? 'Active' : 'Inactive' }}
            </div>
          </div>
          
          <div class="course-info">
            <h3>{{ course.courseName }}</h3>
            <p class="description" *ngIf="course.description">{{ course.description }}</p>
            <div class="course-details">
              <span class="credits">{{ course.credits }} credits</span>
              <span class="price">{{ course.price }}</span>
            </div>
            <p class="students" *ngIf="course.studentIds && course.studentIds.length > 0">
              {{ course.studentIds.length }} student(s) enrolled
            </p>
          </div>
          
          <div class="actions">
            <a [routerLink]="['/courses/edit', course.id]" class="edit-btn">✏️ Edit</a>
            <button (click)="deleteCourse(course.id!)" class="delete-btn">🗑️ Delete</button>
          </div>
        </div>
      </div>
      
      <div *ngIf="courses.length === 0" class="no-courses">
        <p>No courses found. Add your first course!</p>
      </div>
    </div>
  `,
  styles: [`
    .course-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      color: white;
    }
    
    .header h2 {
      font-size: 2rem;
      margin: 0;
    }
    
    .add-btn {
      background: #764ba2;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .add-btn:hover {
      background: #6a4190;
      transform: translateY(-2px);
    }
    
    .search-section {
      margin-bottom: 2rem;
    }
    
    .search-input {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }
    
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .course-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease;
    }
    
    .course-card:hover {
      transform: translateY(-5px);
    }
    
    .course-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .course-code {
      background: linear-gradient(135deg, #764ba2, #667eea);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .course-status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      background: #e9ecef;
      color: #6c757d;
    }
    
    .course-status.active {
      background: #d4edda;
      color: #155724;
    }
    
    .course-info h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.3rem;
    }
    
    .description {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.4;
    }
    
    .course-details {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .credits, .price {
      background: #f8f9fa;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.9rem;
      color: #495057;
    }
    
    .price {
      background: #e3f2fd;
      color: #1976d2;
      font-weight: 600;
    }
    
    .students {
      font-size: 0.9rem;
      color: #764ba2;
      font-weight: 500;
      margin: 0;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .edit-btn, .delete-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }
    
    .edit-btn {
      background: #4facfe;
      color: white;
      text-decoration: none;
    }
    
    .delete-btn {
      background: #ff6b6b;
      color: white;
    }
    
    .edit-btn:hover {
      background: #3a9bff;
    }
    
    .delete-btn:hover {
      background: #ff5252;
    }
    
    .no-courses {
      text-align: center;
      color: white;
      font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .courses-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  
  constructor(private courseService: CourseService) {}
  
  ngOnInit(): void {
    this.loadCourses();
  }
  
  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }
  
  onSearch(event: any): void {
    const query = event.target.value;
    if (query.trim()) {
      this.courseService.searchCourses(query).subscribe(courses => {
        this.courses = courses;
      });
    } else {
      this.loadCourses();
    }
  }
  
  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }
}
