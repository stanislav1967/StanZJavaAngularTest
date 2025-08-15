export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  description?: string;
  credits: number;
  price: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  studentIds?: number[];
}

export interface CourseFormData {
  courseCode: string;
  courseName: string;
  description?: string;
  credits: number;
  price: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  studentIds?: number[];
}
