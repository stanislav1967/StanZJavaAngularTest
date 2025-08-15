package com.example.demo.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public class CourseDto {
    
    private Long id;
    
    @NotBlank(message = "Course code is required")
    @Size(min = 3, max = 10, message = "Course code must be between 3 and 10 characters")
    private String courseCode;
    
    @NotBlank(message = "Course name is required")
    @Size(min = 5, max = 100, message = "Course name must be between 5 and 100 characters")
    private String courseName;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    
    @NotNull(message = "Credits are required")
    @Min(value = 1, message = "Credits must be at least 1")
    @Max(value = 6, message = "Credits cannot exceed 6")
    private Integer credits;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;
    
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isActive = true;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private Set<Long> studentIds;
    
    // Constructors
    public CourseDto() {}
    
    public CourseDto(String courseCode, String courseName, Integer credits, BigDecimal price) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.credits = credits;
        this.price = price;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCourseCode() {
        return courseCode;
    }
    
    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }
    
    public String getCourseName() {
        return courseName;
    }
    
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getCredits() {
        return credits;
    }
    
    public void setCredits(Integer credits) {
        this.credits = credits;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LocalDate getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Set<Long> getStudentIds() {
        return studentIds;
    }
    
    public void setStudentIds(Set<Long> studentIds) {
        this.studentIds = studentIds;
    }
}
