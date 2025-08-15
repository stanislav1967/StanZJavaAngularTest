package com.student.management.repository;

import com.student.management.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    Optional<Course> findByCourseCode(String courseCode);
    
    List<Course> findByCourseNameContainingIgnoreCase(String courseName);
    
    List<Course> findByIsActiveTrue();
    
    @Query("SELECT c FROM Course c JOIN c.students s WHERE s.id = :studentId")
    List<Course> findCoursesByStudentId(@Param("studentId") Long studentId);
    
    boolean existsByCourseCode(String courseCode);
    
    boolean existsByCourseCodeAndIdNot(String courseCode, Long id);
}
