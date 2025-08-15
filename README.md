# 🎓 Student Management System

A comprehensive full-stack application for managing students and their course enrollments, built with **Spring Boot 3.x** (Java 17) and **Angular 18**.

## 🚀 **Features**

### **Backend (Spring Boot)**
- **Java 17** with **Spring Boot 3.2.0**
- **JPA/Hibernate** with **H2 Database** (embedded)
- **RESTful APIs** with proper HTTP methods
- **Validation** using Bean Validation
- **Exception Handling** with global exception handler
- **Transaction Management** for data integrity
- **CORS Configuration** for frontend communication
- **Unit Tests** with JUnit 5 and Mockito

### **Frontend (Angular 18)**
- **Angular 18** with standalone components
- **RxJS** for state management and observables
- **Reactive Forms** with validation
- **Modern UI** with glassmorphism effects
- **Responsive Design** for all devices
- **TypeScript** for type safety

### **Core Functionality**
- ✅ **Student Management**: CRUD operations for students
- ✅ **Course Management**: CRUD operations for courses
- ✅ **Enrollment System**: Many-to-many relationship between students and courses
- ✅ **Search & Filter**: Find students and courses quickly
- ✅ **Dashboard**: Overview with statistics and recent items
- ✅ **Validation**: Frontend and backend validation
- ✅ **Error Handling**: User-friendly error messages

## 🏗️ **Architecture**

```
Student Management System
├── Backend (Spring Boot)
│   ├── Controllers (REST APIs)
│   ├── Services (Business Logic)
│   ├── Repositories (Data Access)
│   ├── Entities (JPA Models)
│   ├── DTOs (Data Transfer Objects)
│   └── Exception Handling
└── Frontend (Angular)
    ├── Components (UI)
    ├── Services (API Communication)
    ├── Models (TypeScript Interfaces)
    └── State Management (RxJS)
```

## 📋 **Prerequisites**

- **Java 17** or higher
- **Maven 3.6** or higher
- **Node.js 18** or higher
- **npm** or **yarn** package manager

## 🚀 **Quick Start**

### **1. Clone and Setup**
```bash
git clone <repository-url>
cd JavaAngularTest
```

### **2. Start the Backend**
```bash
cd backend
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`

**H2 Console**: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:studentdb`
- Username: `sa`
- Password: `password`

### **3. Start the Frontend**
```bash
cd frontend
npm install
npm start
```
The frontend will start on `http://localhost:4200`

## 🔧 **API Endpoints**

### **Students**
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student
- `GET /api/students/search?q={query}` - Search students
- `POST /api/students/{id}/courses` - Enroll student in courses

### **Courses**
- `GET /api/courses` - Get all courses
- `GET /api/courses/active` - Get active courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course
- `GET /api/courses/search?q={query}` - Search courses

### **Enrollments**
- `POST /api/enrollments/enroll` - Enroll student in course
- `DELETE /api/enrollments/unenroll/{studentId}/{courseId}` - Unenroll student from course
- `GET /api/enrollments/student/{studentId}` - Get student enrollments
- `GET /api/enrollments/course/{courseId}` - Get course enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/courses/{id}/students` - Enroll students in course

## 🗄️ **Database Schema**

### **Students Table**
- `id` (Primary Key)
- `first_name`, `last_name`, `email`
- `date_of_birth`, `phone_number`
- `created_at`, `updated_at`

### **Courses Table**
- `id` (Primary Key)
- `course_code`, `course_name`, `description`
- `credits`, `price`, `start_date`, `end_date`
- `is_active`, `created_at`, `updated_at`

### **Student_Courses Table** (Junction Table)
- `student_id` (Foreign Key)
- `course_id` (Foreign Key)

## 🎨 **Frontend Components**

### **Dashboard**
- Statistics overview
- Quick action buttons
- Recent students and courses

### **Student Management**
- Student list with search
- Add/Edit student forms
- Course enrollment management

### **Course Management**
- Course list with search
- Add/Edit course forms
- Student enrollment management

## 🧪 **Testing**

### **Backend Tests**
```bash
cd backend
mvn test
```

**Test Coverage:**
- Service layer unit tests
- Repository layer tests
- Exception handling tests
- Validation tests

### **Frontend Tests**
```bash
cd frontend
npm test
```

## 🔒 **Security & Validation**

### **Backend Validation**
- Bean Validation annotations
- Custom validation rules
- Email uniqueness validation
- Course code uniqueness validation

### **Frontend Validation**
- Reactive forms validation
- Real-time error feedback
- Input sanitization

### **CORS Configuration**
- Configured for `localhost:4200`
- All HTTP methods allowed
- Credentials support enabled

## 📱 **Responsive Design**

- **Mobile-first** approach
- **CSS Grid** and **Flexbox** layouts
- **Media queries** for breakpoints
- **Touch-friendly** interactions

## 🚀 **Deployment**

### **Backend Deployment**
```bash
cd backend
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### **Frontend Build**
```bash
cd frontend
npm run build
```

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Port Conflicts**
   - Backend: Check if port 8080 is available
   - Frontend: Check if port 4200 is available

2. **Database Issues**
   - H2 database is in-memory and resets on restart
   - Sample data is loaded automatically

3. **CORS Errors**
   - Ensure backend is running on port 8080
   - Check CORS configuration in `CorsConfig.java`

4. **Build Errors**
   - Verify Java 17+ and Node.js 18+ versions
   - Clear Maven cache: `mvn clean`
   - Clear npm cache: `npm cache clean --force`

## 🔄 **Development Workflow**

1. **Backend Changes**
   - Edit Java files in `backend/src/main/java/`
   - Use `mvn spring-boot:run` for development
   - Database auto-recreates on restart

2. **Frontend Changes**
   - Edit Angular components in `frontend/src/app/`
   - Use `ng serve` for hot reload
   - Changes reflect immediately in browser

## 📚 **Learning Resources**

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [JPA/Hibernate Guide](https://hibernate.org/orm/documentation/)
- [RxJS Documentation](https://rxjs.dev/)

## 📝 **Change Log - From First Working Version**

### **Package Structure Changes**
- Renamed package from `com.example.demo` to `com.student.management`
- Updated all Java class imports to use new package structure
- Moved all source files to new package hierarchy
- Updated test files to use new package structure

### **Application Class Changes**
- Renamed `DemoApplication` to `StudentManagementSystemApplication`
- Updated main class reference in Spring Boot run method
- Removed old `DemoApplication.java` file

### **Controller Changes**
- Removed `HelloController` (was used for basic API testing)
- Updated all controller imports to use new package structure
- Maintained all existing REST API endpoints and functionality

### **Frontend Architecture Changes**
- Moved all inline HTML templates from components to separate `.html` files
- Moved all inline CSS styles from components to separate `.css` files
- Updated all components to use `templateUrl` and `styleUrls` properties
- Refactored Angular components for better separation of concerns

### **Model Interface Changes**
- Modified `Course` interface to make `id` property required (changed from `id?: number` to `id: number`)
- Updated all related TypeScript code to handle required ID property

### **File Structure Improvements**
- Created external HTML template files for all Angular components
- Created external CSS style files for all Angular components
- Improved code organization and maintainability
- Enhanced developer experience with better file separation

### **Code Quality Improvements**
- Eliminated duplicate package structures
- Cleaned up old unused files and directories
- Improved project organization and naming conventions
- Enhanced code readability and maintainability

