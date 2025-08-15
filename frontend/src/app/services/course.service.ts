import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Course, CourseFormData } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Get all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      tap(courses => this.coursesSubject.next(courses)),
      catchError(this.handleError)
    );
  }

  // Get active courses
  getActiveCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/active`).pipe(
      catchError(this.handleError)
    );
  }

  // Get course by ID
  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create new course
  createCourse(course: CourseFormData): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => {
        const currentCourses = this.coursesSubject.value;
        this.coursesSubject.next([...currentCourses, newCourse]);
      }),
      catchError(this.handleError)
    );
  }

  // Update course
  updateCourse(id: number, course: CourseFormData): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap(updatedCourse => {
        const currentCourses = this.coursesSubject.value;
        const index = currentCourses.findIndex(c => c.id === id);
        if (index !== -1) {
          currentCourses[index] = updatedCourse;
          this.coursesSubject.next([...currentCourses]);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Delete course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentCourses = this.coursesSubject.value;
        const filteredCourses = currentCourses.filter(c => c.id !== id);
        this.coursesSubject.next(filteredCourses);
      }),
      catchError(this.handleError)
    );
  }

  // Search courses
  searchCourses(query: string): Observable<Course[]> {
    const url = query ? `${this.apiUrl}/search?q=${encodeURIComponent(query)}` : this.apiUrl;
    return this.http.get<Course[]>(url).pipe(
      tap(courses => this.coursesSubject.next(courses)),
      catchError(this.handleError)
    );
  }

  // Enroll students in course
  enrollStudentsInCourse(courseId: number, studentIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${courseId}/students`, studentIds).pipe(
      catchError(this.handleError)
    );
  }

  // Refresh courses list
  refreshCourses(): void {
    this.getCourses().subscribe();
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
