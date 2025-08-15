import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Student, StudentFormData } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/students';
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.studentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      tap(students => this.studentsSubject.next(students)),
      catchError(this.handleError)
    );
  }

  // Get student by ID
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create new student
  createStudent(student: StudentFormData): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      tap(newStudent => {
        const currentStudents = this.studentsSubject.value;
        this.studentsSubject.next([...currentStudents, newStudent]);
      }),
      catchError(this.handleError)
    );
  }

  // Update student
  updateStudent(id: number, student: StudentFormData): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student).pipe(
      tap(updatedStudent => {
        const currentStudents = this.studentsSubject.value;
        const index = currentStudents.findIndex(s => s.id === id);
        if (index !== -1) {
          currentStudents[index] = updatedStudent;
          this.studentsSubject.next([...currentStudents]);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Delete student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentStudents = this.studentsSubject.value;
        const filteredStudents = currentStudents.filter(s => s.id !== id);
        this.studentsSubject.next(filteredStudents);
      }),
      catchError(this.handleError)
    );
  }

  // Search students
  searchStudents(query: string): Observable<Student[]> {
    const url = query ? `${this.apiUrl}/search?q=${encodeURIComponent(query)}` : this.apiUrl;
    return this.http.get<Student[]>(url).pipe(
      tap(students => this.studentsSubject.next(students)),
      catchError(this.handleError)
    );
  }

  // Enroll student in courses
  enrollStudentInCourses(studentId: number, courseIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${studentId}/courses`, courseIds).pipe(
      catchError(this.handleError)
    );
  }

  // Refresh students list
  refreshStudents(): void {
    this.getStudents().subscribe();
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
