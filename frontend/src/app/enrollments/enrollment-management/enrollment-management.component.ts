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
  templateUrl: './enrollment-management.component.html',
  styleUrls: ['./enrollment-management.component.css']
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
