import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseFormData } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="course-form-container">
      <div class="header">
        <h2>{{ isEditMode ? 'Edit Course' : 'Add New Course' }}</h2>
        <a routerLink="/courses" class="back-btn">← Back to Courses</a>
      </div>
      
      <form (ngSubmit)="onSubmit()" class="course-form">
        <div class="form-group">
          <label for="courseCode">Course Code *</label>
          <input 
            type="text" 
            id="courseCode" 
            name="courseCode"
            [(ngModel)]="course.courseCode"
            required
            minlength="3"
            maxlength="10"
            class="form-input">
        </div>
        
        <div class="form-group">
          <label for="courseName">Course Name *</label>
          <input 
            type="text" 
            id="courseName" 
            name="courseName"
            [(ngModel)]="course.courseName"
            required
            minlength="5"
            maxlength="100"
            class="form-input">
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description" 
            name="description"
            [(ngModel)]="course.description"
            maxlength="500"
            rows="3"
            class="form-input"></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="credits">Credits *</label>
            <input 
              type="number" 
              id="credits" 
              name="credits"
              [(ngModel)]="course.credits"
              required
              min="1"
              max="6"
              class="form-input">
          </div>
          
          <div class="form-group">
            <label for="price">Price *</label>
            <input 
              type="number" 
              id="price" 
              name="price"
              [(ngModel)]="course.price"
              required
              min="0.01"
              step="0.01"
              class="form-input">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="startDate">Start Date</label>
            <input 
              type="date" 
              id="startDate" 
              name="startDate"
              [(ngModel)]="course.startDate"
              class="form-input">
          </div>
          
          <div class="form-group">
            <label for="endDate">End Date</label>
            <input 
              type="date" 
              id="endDate" 
              name="endDate"
              [(ngModel)]="course.endDate"
              class="form-input">
          </div>
        </div>
        
        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              name="isActive"
              [(ngModel)]="course.isActive"
              class="checkbox-input">
            Active Course
          </label>
        </div>
        
        <div class="form-actions">
          <button type="button" routerLink="/courses" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn" [disabled]="!isFormValid()">
            {{ isEditMode ? 'Update Course' : 'Add Course' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .course-form-container {
      max-width: 600px;
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
    
    .back-btn {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s ease;
    }
    
    .back-btn:hover {
      opacity: 0.8;
    }
    
    .course-form {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    
    .checkbox-input {
      width: auto;
      margin: 0;
    }
    
    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #764ba2;
    }
    
    .form-input.ng-invalid.ng-touched {
      border-color: #ff6b6b;
    }
    
    textarea.form-input {
      resize: vertical;
      min-height: 80px;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }
    
    .cancel-btn, .submit-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .cancel-btn {
      background: #6c757d;
      color: white;
    }
    
    .submit-btn {
      background: #764ba2;
      color: white;
    }
    
    .submit-btn:hover:not(:disabled) {
      background: #6a4190;
      transform: translateY(-2px);
    }
    
    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .cancel-btn:hover {
      background: #5a6268;
    }
    
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class CourseFormComponent implements OnInit {
  course: CourseFormData = {
    courseCode: '',
    courseName: '',
    description: '',
    credits: 3,
    price: 0,
    isActive: true
  };
  
  isEditMode = false;
  courseId: number | null = null;
  
  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.courseId = +params['id'];
        this.loadCourse(this.courseId);
      }
    });
  }
  
  loadCourse(id: number): void {
    this.courseService.getCourse(id).subscribe(course => {
      this.course = {
        courseCode: course.courseCode,
        courseName: course.courseName,
        description: course.description || '',
        credits: course.credits,
        price: course.price,
        isActive: course.isActive
      };
    });
  }
  
  onSubmit(): void {
    if (this.isFormValid()) {
      if (this.isEditMode && this.courseId) {
        this.courseService.updateCourse(this.courseId, this.course).subscribe(() => {
          this.router.navigate(['/courses']);
        });
      } else {
        this.courseService.createCourse(this.course).subscribe(() => {
          this.router.navigate(['/courses']);
        });
      }
    }
  }
  
  isFormValid(): boolean {
    return !!(
      this.course.courseCode?.trim() &&
      this.course.courseName?.trim() &&
      this.course.credits &&
      this.course.credits >= 1 &&
      this.course.credits <= 6 &&
      this.course.price &&
      this.course.price > 0
    );
  }
}
