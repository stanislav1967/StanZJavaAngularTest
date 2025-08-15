package com.example.demo.dto;

import java.time.LocalDateTime;

public class EnrollmentResponse {
    
    private Long id;
    private Long studentId;
    private Long courseId;
    private LocalDateTime enrolledAt;
    private String studentName;
    private String courseName;
    
    // Default constructor
    public EnrollmentResponse() {}
    
    // Parameterized constructor
    public EnrollmentResponse(Long id, Long studentId, Long courseId, LocalDateTime enrolledAt, 
                           String studentName, String courseName) {
        this.id = id;
        this.studentId = studentId;
        this.courseId = courseId;
        this.enrolledAt = enrolledAt;
        this.studentName = studentName;
        this.courseName = courseName;
    }
    
    // Getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getStudentId() {
        return studentId;
    }
    
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    
    public Long getCourseId() {
        return courseId;
    }
    
    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
    
    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }
    
    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
    
    public String getStudentName() {
        return studentName;
    }
    
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    
    public String getCourseName() {
        return courseName;
    }
    
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
