package com.example.demo.service;

import com.example.demo.dto.StudentDto;
import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.ValidationException;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    
    @Mock
    private StudentRepository studentRepository;
    
    @Mock
    private CourseRepository courseRepository;
    
    @InjectMocks
    private StudentService studentService;
    
    private Student testStudent;
    private StudentDto testStudentDto;
    private Course testCourse;
    
    @BeforeEach
    void setUp() {
        testStudent = new Student("John", "Doe", "john.doe@email.com", LocalDate.of(2000, 5, 15));
        testStudent.setId(1L);
        testStudent.setPhoneNumber("+1234567890");
        
        testStudentDto = new StudentDto("John", "Doe", "john.doe@email.com", LocalDate.of(2000, 5, 15));
        testStudentDto.setId(1L);
        testStudentDto.setPhoneNumber("+1234567890");
        
        testCourse = new Course("CS101", "Computer Science", 3, new java.math.BigDecimal("299.99"));
        testCourse.setId(1L);
    }
    
    @Test
    void getAllStudents_ShouldReturnAllStudents() {
        // Arrange
        when(studentRepository.findAll()).thenReturn(Arrays.asList(testStudent));
        
        // Act
        List<StudentDto> result = studentService.getAllStudents();
        
        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("John", result.get(0).getFirstName());
        verify(studentRepository).findAll();
    }
    
    @Test
    void getStudentById_WhenStudentExists_ShouldReturnStudent() {
        // Arrange
        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));
        
        // Act
        StudentDto result = studentService.getStudentById(1L);
        
        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        verify(studentRepository).findById(1L);
    }
    
    @Test
    void getStudentById_WhenStudentNotFound_ShouldThrowException() {
        // Arrange
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> studentService.getStudentById(999L));
        verify(studentRepository).findById(999L);
    }
    
    @Test
    void createStudent_WhenValidData_ShouldCreateStudent() {
        // Arrange
        when(studentRepository.existsByEmail("john.doe@email.com")).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenReturn(testStudent);
        
        // Act
        StudentDto result = studentService.createStudent(testStudentDto);
        
        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        verify(studentRepository).existsByEmail("john.doe@email.com");
        verify(studentRepository).save(any(Student.class));
    }
    
    @Test
    void createStudent_WhenEmailExists_ShouldThrowException() {
        // Arrange
        when(studentRepository.existsByEmail("john.doe@email.com")).thenReturn(true);
        
        // Act & Assert
        assertThrows(ValidationException.class, () -> studentService.createStudent(testStudentDto));
        verify(studentRepository).existsByEmail("john.doe@email.com");
        verify(studentRepository, never()).save(any(Student.class));
    }
    
    @Test
    void updateStudent_WhenValidData_ShouldUpdateStudent() {
        // Arrange
        StudentDto updateDto = new StudentDto("Jane", "Doe", "jane.doe@email.com", LocalDate.of(2000, 5, 15));
        updateDto.setId(1L);
        updateDto.setPhoneNumber("+1234567890");
        
        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));
        when(studentRepository.existsByEmailAndIdNot("jane.doe@email.com", 1L)).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenReturn(testStudent);
        
        // Act
        StudentDto result = studentService.updateStudent(1L, updateDto);
        
        // Assert
        assertNotNull(result);
        verify(studentRepository).findById(1L);
        verify(studentRepository).existsByEmailAndIdNot("jane.doe@email.com", 1L);
        verify(studentRepository).save(any(Student.class));
    }
    
    @Test
    void updateStudent_WhenStudentNotFound_ShouldThrowException() {
        // Arrange
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> studentService.updateStudent(999L, testStudentDto));
        verify(studentRepository).findById(999L);
        verify(studentRepository, never()).save(any(Student.class));
    }
    
    @Test
    void deleteStudent_WhenStudentExists_ShouldDeleteStudent() {
        // Arrange
        when(studentRepository.existsById(1L)).thenReturn(true);
        
        // Act
        studentService.deleteStudent(1L);
        
        // Assert
        verify(studentRepository).existsById(1L);
        verify(studentRepository).deleteById(1L);
    }
    
    @Test
    void deleteStudent_WhenStudentNotFound_ShouldThrowException() {
        // Arrange
        when(studentRepository.existsById(999L)).thenReturn(false);
        
        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> studentService.deleteStudent(999L));
        verify(studentRepository).existsById(999L);
        verify(studentRepository, never()).deleteById(any());
    }
    
    @Test
    void searchStudents_WhenSearchTermProvided_ShouldReturnFilteredResults() {
        // Arrange
        when(studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase("John", "John"))
                .thenReturn(Arrays.asList(testStudent));
        
        // Act
        List<StudentDto> result = studentService.searchStudents("John");
        
        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(studentRepository).findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase("John", "John");
    }
    
    @Test
    void searchStudents_WhenNoSearchTerm_ShouldReturnAllStudents() {
        // Arrange
        when(studentRepository.findAll()).thenReturn(Arrays.asList(testStudent));
        
        // Act
        List<StudentDto> result = studentService.searchStudents(null);
        
        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(studentRepository).findAll();
    }
}
