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
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
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
