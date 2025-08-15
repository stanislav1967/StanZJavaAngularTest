import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="student-list-container">
      <div class="header">
        <h2>Student Management</h2>
        <a routerLink="/students/new" class="add-btn">➕ Add New Student</a>
      </div>
      
      <div class="search-section">
        <input 
          type="text" 
          placeholder="Search students..." 
          class="search-input"
          (input)="onSearch($event)">
      </div>
      
      <div class="students-grid">
        <div *ngFor="let student of students" class="student-card">
          <div class="student-avatar">
            {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}
          </div>
          <div class="student-info">
            <h3>{{ student.firstName }} {{ student.lastName }}</h3>
            <p class="email">{{ student.email }}</p>
            <p class="phone" *ngIf="student.phoneNumber">{{ student.phoneNumber }}</p>
            <p class="courses" *ngIf="student.courseIds && student.courseIds.length > 0">
              Enrolled in {{ student.courseIds.length }} course(s)
            </p>
          </div>
          <div class="actions">
            <a [routerLink]="['/students/edit', student.id]" class="edit-btn">✏️ Edit</a>
            <button (click)="deleteStudent(student.id!)" class="delete-btn">🗑️ Delete</button>
          </div>
        </div>
      </div>
      
      <div *ngIf="students.length === 0" class="no-students">
        <p>No students found. Add your first student!</p>
      </div>
    </div>
  `,
  styles: [`
    .student-list-container {
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
      background: #667eea;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .add-btn:hover {
      background: #5a6fd8;
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
    
    .students-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .student-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: transform 0.3s ease;
    }
    
    .student-card:hover {
      transform: translateY(-5px);
    }
    
    .student-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    
    .student-info h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.3rem;
    }
    
    .student-info p {
      margin: 0.25rem 0;
      color: #666;
    }
    
    .email {
      font-weight: 500;
    }
    
    .phone {
      font-size: 0.9rem;
    }
    
    .courses {
      font-size: 0.9rem;
      color: #667eea;
      font-weight: 500;
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
    
    .no-students {
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
      
      .students-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  
  constructor(private studentService: StudentService) {}
  
  ngOnInit(): void {
    this.loadStudents();
  }
  
  loadStudents(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }
  
  onSearch(event: any): void {
    const query = event.target.value;
    if (query.trim()) {
      this.studentService.searchStudents(query).subscribe(students => {
        this.students = students;
      });
    } else {
      this.loadStudents();
    }
  }
  
  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}
