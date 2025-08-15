import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { VersionService } from '../services/version.service';
import { Student } from '../models/student.model';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
    private courseService: CourseService,
    public versionService: VersionService
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
