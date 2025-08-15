package com.student.management.service;

import com.student.management.dto.CourseDto;
import com.student.management.entity.Course;
import com.student.management.entity.Student;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.exception.ValidationException;
import com.student.management.repository.CourseRepository;
import com.student.management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CourseDto> getActiveCourses() {
        return courseRepository.findByIsActiveTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return convertToDto(course);
    }
    
    public CourseDto createCourse(CourseDto courseDto) {
        // Validate course code uniqueness
        if (courseRepository.existsByCourseCode(courseDto.getCourseCode())) {
            throw new ValidationException("Course code already exists: " + courseDto.getCourseCode());
        }
        
        Course course = convertToEntity(courseDto);
        Course savedCourse = courseRepository.save(course);
        
        // Handle student enrollments if provided
        if (courseDto.getStudentIds() != null && !courseDto.getStudentIds().isEmpty()) {
            enrollStudentsInCourse(savedCourse.getId(), courseDto.getStudentIds());
        }
        
        return convertToDto(savedCourse);
    }
    
    public CourseDto updateCourse(Long id, CourseDto courseDto) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        
        // Validate course code uniqueness (excluding current course)
        if (!existingCourse.getCourseCode().equals(courseDto.getCourseCode()) &&
            courseRepository.existsByCourseCodeAndIdNot(courseDto.getCourseCode(), id)) {
            throw new ValidationException("Course code already exists: " + courseDto.getCourseCode());
        }
        
        // Update fields
        existingCourse.setCourseCode(courseDto.getCourseCode());
        existingCourse.setCourseName(courseDto.getCourseName());
        existingCourse.setDescription(courseDto.getDescription());
        existingCourse.setCredits(courseDto.getCredits());
        existingCourse.setPrice(courseDto.getPrice());
        existingCourse.setStartDate(courseDto.getStartDate());
        existingCourse.setEndDate(courseDto.getEndDate());
        existingCourse.setIsActive(courseDto.getIsActive());
        
        Course updatedCourse = courseRepository.save(existingCourse);
        
        // Handle student enrollments if provided
        if (courseDto.getStudentIds() != null) {
            updateCourseStudents(updatedCourse, courseDto.getStudentIds());
        }
        
        return convertToDto(updatedCourse);
    }
    
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
    
    public List<CourseDto> searchCourses(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllCourses();
        }
        
        String trimmedTerm = searchTerm.trim();
        return courseRepository.findByCourseNameContainingIgnoreCase(trimmedTerm)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public void enrollStudentsInCourse(Long courseId, Set<Long> studentIds) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
        
        for (Long studentId : studentIds) {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));
            course.addStudent(student);
        }
        
        courseRepository.save(course);
    }
    
    private void updateCourseStudents(Course course, Set<Long> newStudentIds) {
        // Remove all current enrollments
        course.getStudents().clear();
        
        // Add new enrollments
        if (newStudentIds != null && !newStudentIds.isEmpty()) {
            for (Long studentId : newStudentIds) {
                Student student = studentRepository.findById(studentId)
                        .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));
                course.addStudent(student);
            }
        }
    }
    
    private Course convertToEntity(CourseDto dto) {
        Course course = new Course();
        course.setId(dto.getId());
        course.setCourseCode(dto.getCourseCode());
        course.setCourseName(dto.getCourseName());
        course.setDescription(dto.getDescription());
        course.setCredits(dto.getCredits());
        course.setPrice(dto.getPrice());
        course.setStartDate(dto.getStartDate());
        course.setEndDate(dto.getEndDate());
        course.setIsActive(dto.getIsActive());
        return course;
    }
    
    private CourseDto convertToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setCourseCode(course.getCourseCode());
        dto.setCourseName(course.getCourseName());
        dto.setDescription(course.getDescription());
        dto.setCredits(course.getCredits());
        dto.setPrice(course.getPrice());
        dto.setStartDate(course.getStartDate());
        dto.setEndDate(course.getEndDate());
        dto.setIsActive(course.getIsActive());
        dto.setCreatedAt(course.getCreatedAt());
        dto.setUpdatedAt(course.getUpdatedAt());
        
        // Convert student IDs
        Set<Long> studentIds = course.getStudents().stream()
                .map(Student::getId)
                .collect(Collectors.toSet());
        dto.setStudentIds(studentIds);
        
        return dto;
    }
}
