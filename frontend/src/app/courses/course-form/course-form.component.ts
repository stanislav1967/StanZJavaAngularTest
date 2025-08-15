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
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
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
