package com.example.demo.service;

import com.example.demo.dto.StudentDto;
import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.ValidationException;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public StudentDto getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return convertToDto(student);
    }
    
    public StudentDto createStudent(StudentDto studentDto) {
        // Validate email uniqueness
        if (studentRepository.existsByEmail(studentDto.getEmail())) {
            throw new ValidationException("Email already exists: " + studentDto.getEmail());
        }
        
        Student student = convertToEntity(studentDto);
        Student savedStudent = studentRepository.save(student);
        
        // Handle course enrollments if provided
        if (studentDto.getCourseIds() != null && !studentDto.getCourseIds().isEmpty()) {
            enrollStudentInCourses(savedStudent.getId(), studentDto.getCourseIds());
        }
        
        return convertToDto(savedStudent);
    }
    
    public StudentDto updateStudent(Long id, StudentDto studentDto) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        
        // Validate email uniqueness (excluding current student)
        if (!existingStudent.getEmail().equals(studentDto.getEmail()) &&
            studentRepository.existsByEmailAndIdNot(studentDto.getEmail(), id)) {
            throw new ValidationException("Email already exists: " + studentDto.getEmail());
        }
        
        // Update fields
        existingStudent.setFirstName(studentDto.getFirstName());
        existingStudent.setLastName(studentDto.getLastName());
        existingStudent.setEmail(studentDto.getEmail());
        existingStudent.setDateOfBirth(studentDto.getDateOfBirth());
        existingStudent.setPhoneNumber(studentDto.getPhoneNumber());
        
        Student updatedStudent = studentRepository.save(existingStudent);
        
        // Handle course enrollments if provided
        if (studentDto.getCourseIds() != null) {
            updateStudentCourses(updatedStudent, studentDto.getCourseIds());
        }
        
        return convertToDto(updatedStudent);
    }
    
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
    
    public List<StudentDto> searchStudents(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllStudents();
        }
        
        String trimmedTerm = searchTerm.trim();
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                trimmedTerm, trimmedTerm)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public void enrollStudentInCourses(Long studentId, Set<Long> courseIds) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));
        
        for (Long courseId : courseIds) {
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
            student.addCourse(course);
        }
        
        studentRepository.save(student);
    }
    
    private void updateStudentCourses(Student student, Set<Long> newCourseIds) {
        // Remove all current enrollments
        student.getCourses().clear();
        
        // Add new enrollments
        if (newCourseIds != null && !newCourseIds.isEmpty()) {
            for (Long courseId : newCourseIds) {
                Course course = courseRepository.findById(courseId)
                        .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
                student.addCourse(course);
            }
        }
    }
    
    private Student convertToEntity(StudentDto dto) {
        Student student = new Student();
        student.setId(dto.getId());
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setPhoneNumber(dto.getPhoneNumber());
        return student;
    }
    
    private StudentDto convertToDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setDateOfBirth(student.getDateOfBirth());
        dto.setPhoneNumber(student.getPhoneNumber());
        dto.setCreatedAt(student.getCreatedAt());
        dto.setUpdatedAt(student.getUpdatedAt());
        
        // Convert course IDs
        Set<Long> courseIds = student.getCourses().stream()
                .map(Course::getId)
                .collect(Collectors.toSet());
        dto.setCourseIds(courseIds);
        
        return dto;
    }
}
