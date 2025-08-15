import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface EnrollmentRequest {
  studentId: number;
  courseId: number;
}

export class EnrollmentResponse {
  constructor(
    public id: number | null,
    public studentId: number,
    public courseId: number,
    public enrolledAt: string,
    public studentName: string,
    public courseName: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = `${environment.apiUrl}/enrollments`;

  constructor(private http: HttpClient) {}

  enrollStudentInCourse(enrollment: EnrollmentRequest): Observable<EnrollmentResponse> {
    // Use the existing student enrollment endpoint
    return this.http.post<void>(`${environment.apiUrl}/api/students/${enrollment.studentId}/courses`, [enrollment.courseId])
      .pipe(
        map(() => new EnrollmentResponse(
          null,
          enrollment.studentId,
          enrollment.courseId,
          new Date().toISOString(),
          '', // Will be populated by the component
          ''  // Will be populated by the component
        ))
      );
  }

  unenrollStudentFromCourse(studentId: number, courseId: number): Observable<void> {
    // Use the existing student update endpoint to remove the course
    return this.http.get<any>(`${environment.apiUrl}/api/students/${studentId}`)
      .pipe(
        map(student => {
          const updatedCourseIds = student.courseIds?.filter((id: number) => id !== courseId) || [];
          return this.http.put<void>(`${environment.apiUrl}/api/students/${studentId}`, {
            ...student,
            courseIds: updatedCourseIds
          });
        }),
        switchMap(updateRequest => updateRequest)
      );
  }

  getStudentEnrollments(studentId: number): Observable<EnrollmentResponse[]> {
    return this.http.get<EnrollmentResponse[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getCourseEnrollments(courseId: number): Observable<EnrollmentResponse[]> {
    return this.http.get<EnrollmentResponse[]>(`${this.apiUrl}/course/${courseId}`);
  }

  getAllEnrollments(): Observable<EnrollmentResponse[]> {
    // Get all students and their course enrollments
    return this.http.get<any[]>(`${environment.apiUrl}/api/students`)
      .pipe(
        map(students => {
          const enrollments: EnrollmentResponse[] = [];
          students.forEach(student => {
            if (student.courseIds && student.courseIds.length > 0) {
              student.courseIds.forEach((courseId: number) => {
                enrollments.push(new EnrollmentResponse(
                  null,
                  student.id,
                  courseId,
                  new Date().toISOString(),
                  `${student.firstName} ${student.lastName}`,
                  '' // Course name will be populated by the component
                ));
              });
            }
          });
          return enrollments;
        })
      );
  }
}
