import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { EnrollmentService, EnrollmentRequest, EnrollmentResponse } from '../../services/enrollment.service';
import { Student } from '../../models/student.model';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-enrollment-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="enrollment-container">
      <div class="header">
        <h2>Enrollment Management</h2>
        <p>Manage student course enrollments</p>
      </div>

      <div class="enrollment-form">
        <h3>Enroll Student in Course</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="studentSelect">Select Student:</label>
            <select id="studentSelect" [(ngModel)]="selectedStudentId" class="form-control">
              <option value="">Choose a student...</option>
              <option *ngFor="let student of students" [value]="student.id">
                {{ student.firstName }} {{ student.lastName }} ({{ student.email }})
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="courseSelect">Select Course:</label>
            <select id="courseSelect" [(ngModel)]="selectedCourseId" class="form-control">
              <option value="">Choose a course...</option>
              <option *ngFor="let course of courses" [value]="course.id">
                {{ course.courseCode }} - {{ course.courseName }}
              </option>
            </select>
          </div>
          
          <button 
            (click)="enrollStudent()" 
            [disabled]="!selectedStudentId || !selectedCourseId"
            class="enroll-btn">
            📚 Enroll Student
          </button>
        </div>
      </div>

      <div class="enrollments-section">
        <h3>Current Enrollments</h3>
        <div class="enrollments-grid">
          <div *ngFor="let enrollment of enrollments" class="enrollment-card">
            <div class="enrollment-info">
              <div class="student-info">
                <strong>{{ enrollment.studentName }}</strong>
                <span class="badge student-badge">👤 Student</span>
              </div>
              <div class="course-info">
                <strong>{{ enrollment.courseName }}</strong>
                <span class="badge course-badge">📖 Course</span>
              </div>
              <div class="enrollment-date">
                Enrolled: {{ enrollment.enrolledAt | date:'short' }}
              </div>
            </div>
            <button 
              (click)="unenrollStudent(enrollment.studentId, enrollment.courseId)"
              class="unenroll-btn">
              🗑️ Unenroll
            </button>
          </div>
        </div>
        
        <div *ngIf="enrollments.length === 0" class="no-enrollments">
          <p>No enrollments found. Enroll a student in a course to get started!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .enrollment-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .header {
      text-align: center;
      margin-bottom: 3rem;
      color: white;
    }
    
    .header h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 300;
    }
    
    .header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .enrollment-form {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 3rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .enrollment-form h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
      align-items: end;
      flex-wrap: wrap;
    }
    
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      background: white;
    }
    
    .enroll-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    
    .enroll-btn:hover:not(:disabled) {
      background: #5a6fd8;
      transform: translateY(-2px);
    }
    
    .enroll-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .enrollments-section {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .enrollments-section h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }
    
    .enrollments-grid {
      display: grid;
      gap: 1rem;
    }
    
    .enrollment-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 12px;
      border-left: 4px solid #667eea;
    }
    
    .enrollment-info {
      flex: 1;
    }
    
    .student-info, .course-info {
      margin-bottom: 0.5rem;
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      margin-left: 0.5rem;
    }
    
    .student-badge {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    .course-badge {
      background: #f3e5f5;
      color: #7b1fa2;
    }
    
    .enrollment-date {
      font-size: 0.9rem;
      color: #666;
    }
    
    .unenroll-btn {
      background: #ff6b6b;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .unenroll-btn:hover {
      background: #ff5252;
      transform: translateY(-2px);
    }
    
    .no-enrollments {
      text-align: center;
      color: #666;
      font-style: italic;
    }
    
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
      }
      
      .enrollment-card {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class EnrollmentManagementComponent implements OnInit {
  students: Student[] = [];
  courses: Course[] = [];
  enrollments: EnrollmentResponse[] = [];
  selectedStudentId: number | null = null;
  selectedCourseId: number | null = null;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
    this.loadEnrollments();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  loadEnrollments(): void {
    this.enrollmentService.getAllEnrollments().subscribe(enrollments => {
      // Populate course names
      this.enrollments = enrollments.map(enrollment => {
        const course = this.courses.find(c => c.id === enrollment.courseId);
        if (course) {
          enrollment.courseName = course.courseName;
        }
        return enrollment;
      });
    });
  }

  enrollStudent(): void {
    if (this.selectedStudentId && this.selectedCourseId) {
      const enrollment: EnrollmentRequest = {
        studentId: this.selectedStudentId,
        courseId: this.selectedCourseId
      };

      this.enrollmentService.enrollStudentInCourse(enrollment).subscribe({
        next: () => {
          this.loadEnrollments();
          this.selectedStudentId = null;
          this.selectedCourseId = null;
          alert('Student enrolled successfully!');
        },
        error: (error) => {
          console.error('Enrollment failed:', error);
          alert('Failed to enroll student. Please try again.');
        }
      });
    }
  }

  unenrollStudent(studentId: number, courseId: number): void {
    if (confirm('Are you sure you want to unenroll this student from the course?')) {
      this.enrollmentService.unenrollStudentFromCourse(studentId, courseId).subscribe({
        next: () => {
          this.loadEnrollments();
          alert('Student unenrolled successfully!');
        },
        error: (error) => {
          console.error('Unenrollment failed:', error);
          alert('Failed to unenroll student. Please try again.');
        }
      });
    }
  }
}
