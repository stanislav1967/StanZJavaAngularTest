import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { EnrollmentManagementComponent } from './enrollments/enrollment-management/enrollment-management.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: CourseFormComponent },
  { path: 'courses/edit/:id', component: CourseFormComponent },
  { path: 'enrollments', component: EnrollmentManagementComponent },
  { path: '**', redirectTo: '' }
];
