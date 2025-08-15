import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { StudentFormData } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="student-form-container">
      <div class="header">
        <h2>{{ isEditMode ? 'Edit Student' : 'Add New Student' }}</h2>
        <a routerLink="/students" class="back-btn">← Back to Students</a>
      </div>
      
      <form (ngSubmit)="onSubmit()" class="student-form">
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            [(ngModel)]="student.firstName"
            required
            minlength="2"
            maxlength="50"
            class="form-input">
        </div>
        
        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            [(ngModel)]="student.lastName"
            required
            minlength="2"
            maxlength="50"
            class="form-input">
        </div>
        
        <div class="form-group">
          <label for="email">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            [(ngModel)]="student.email"
            required
            class="form-input">
        </div>
        
        <div class="form-group">
          <label for="dateOfBirth">Date of Birth *</label>
          <input 
            type="date" 
            id="dateOfBirth" 
            name="dateOfBirth"
            [(ngModel)]="student.dateOfBirth"
            required
            class="form-input">
        </div>
        
        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            name="phoneNumber"
            [(ngModel)]="student.phoneNumber"
            class="form-input">
        </div>
        
        <div class="form-actions">
          <button type="button" routerLink="/students" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn" [disabled]="!isFormValid()">
            {{ isEditMode ? 'Update Student' : 'Add Student' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .student-form-container {
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
    
    .student-form {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
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
      border-color: #667eea;
    }
    
    .form-input.ng-invalid.ng-touched {
      border-color: #ff6b6b;
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
      background: #667eea;
      color: white;
    }
    
    .submit-btn:hover:not(:disabled) {
      background: #5a6fd8;
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
      
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class StudentFormComponent implements OnInit {
  student: StudentFormData = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: ''
  };
  
  isEditMode = false;
  studentId: number | null = null;
  
  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.studentId = +params['id'];
        this.loadStudent(this.studentId);
      }
    });
  }
  
  loadStudent(id: number): void {
    this.studentService.getStudent(id).subscribe(student => {
      this.student = {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        phoneNumber: student.phoneNumber || ''
      };
    });
  }
  
  onSubmit(): void {
    if (this.isFormValid()) {
      if (this.isEditMode && this.studentId) {
        this.studentService.updateStudent(this.studentId, this.student).subscribe(() => {
          this.router.navigate(['/students']);
        });
      } else {
        this.studentService.createStudent(this.student).subscribe(() => {
          this.router.navigate(['/students']);
        });
      }
    }
  }
  
  isFormValid(): boolean {
    return !!(
      this.student.firstName?.trim() &&
      this.student.lastName?.trim() &&
      this.student.email?.trim() &&
      this.student.dateOfBirth
    );
  }
}
