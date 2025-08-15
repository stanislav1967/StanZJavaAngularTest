import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
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
