package com.studentsenrollement.courseservice.repositories;

import com.studentsenrollement.courseservice.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Course findByTitle(String title);
}
