package com.example.demo.config;

import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Create sample courses
        Course course1 = new Course("CS101", "Introduction to Computer Science", 3, new BigDecimal("299.99"));
        course1.setDescription("Basic concepts of computer science and programming");
        course1.setStartDate(LocalDate.now().plusDays(30));
        course1.setEndDate(LocalDate.now().plusDays(120));
        
        Course course2 = new Course("MATH201", "Advanced Mathematics", 4, new BigDecimal("399.99"));
        course2.setDescription("Advanced mathematical concepts and problem solving");
        course2.setStartDate(LocalDate.now().plusDays(15));
        course2.setEndDate(LocalDate.now().plusDays(105));
        
        Course course3 = new Course("ENG101", "English Composition", 3, new BigDecimal("249.99"));
        course3.setDescription("Writing skills and composition techniques");
        course3.setStartDate(LocalDate.now().plusDays(45));
        course3.setEndDate(LocalDate.now().plusDays(135));
        
        Course course4 = new Course("PHY101", "Physics Fundamentals", 4, new BigDecimal("349.99"));
        course4.setDescription("Basic principles of physics and mechanics");
        course4.setStartDate(LocalDate.now().plusDays(60));
        course4.setEndDate(LocalDate.now().plusDays(150));
        
        // Save courses
        courseRepository.saveAll(Arrays.asList(course1, course2, course3, course4));
        
        // Create sample students
        Student student1 = new Student("John", "Doe", "john.doe@email.com", LocalDate.of(2000, 5, 15));
        student1.setPhoneNumber("+1234567890");
        
        Student student2 = new Student("Jane", "Smith", "jane.smith@email.com", LocalDate.of(1999, 8, 22));
        student2.setPhoneNumber("+1987654321");
        
        Student student3 = new Student("Mike", "Johnson", "mike.johnson@email.com", LocalDate.of(2001, 3, 10));
        student3.setPhoneNumber("+1555123456");
        
        Student student4 = new Student("Sarah", "Williams", "sarah.williams@email.com", LocalDate.of(2000, 11, 5));
        student4.setPhoneNumber("+1555987654");
        
        // Save students
        studentRepository.saveAll(Arrays.asList(student1, student2, student3, student4));
        
        // Enroll students in courses
        student1.addCourse(course1);
        student1.addCourse(course2);
        
        student2.addCourse(course1);
        student2.addCourse(course3);
        
        student3.addCourse(course2);
        student3.addCourse(course4);
        
        student4.addCourse(course1);
        student4.addCourse(course3);
        student4.addCourse(course4);
        
        // Save updated students
        studentRepository.saveAll(Arrays.asList(student1, student2, student3, student4));
        
        System.out.println("Sample data loaded successfully!");
    }
}
