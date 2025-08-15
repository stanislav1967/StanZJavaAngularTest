package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Course code is required")
    @Size(min = 3, max = 10, message = "Course code must be between 3 and 10 characters")
    @Column(name = "course_code", nullable = false, unique = true)
    private String courseCode;
    
    @NotBlank(message = "Course name is required")
    @Size(min = 5, max = 100, message = "Course name must be between 5 and 100 characters")
    @Column(name = "course_name", nullable = false)
    private String courseName;
    
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Credits are required")
    @Min(value = 1, message = "Credits must be at least 1")
    @Max(value = 6, message = "Credits cannot exceed 6")
    @Column(name = "credits", nullable = false)
    private Integer credits;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDate createdAt;
    
    @Column(name = "updated_at")
    private LocalDate updatedAt;
    
    @ManyToMany(mappedBy = "courses", fetch = FetchType.LAZY)
    private Set<Student> students = new HashSet<>();
    
    // Constructors
    public Course() {}
    
    public Course(String courseCode, String courseName, Integer credits, BigDecimal price) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.credits = credits;
        this.price = price;
    }
    
    // Pre-persist and pre-update methods
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
        this.updatedAt = LocalDate.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDate.now();
    }
    
    // Helper methods
    public void addStudent(Student student) {
        this.students.add(student);
        student.getCourses().add(this);
    }
    
    public void removeStudent(Student student) {
        this.students.remove(student);
        student.getCourses().remove(this);
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
    
    public Set<Student> getStudents() {
        return students;
    }
    
    public void setStudents(Set<Student> students) {
        this.students = students;
    }
    
    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", courseCode='" + courseCode + '\'' +
                ", courseName='" + courseName + '\'' +
                ", credits=" + credits +
                ", price=" + price +
                '}';
    }
}
