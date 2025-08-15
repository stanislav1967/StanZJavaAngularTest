export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  courseIds?: number[];
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber?: string;
  courseIds?: number[];
}
