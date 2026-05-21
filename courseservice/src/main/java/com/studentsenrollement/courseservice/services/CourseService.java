package com.studentsenrollement.courseservice.services;

import com.studentsenrollement.courseservice.models.Course;
import com.studentsenrollement.courseservice.repositories.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course getCourseById(Long id){
        return courseRepository.findById(id).orElse(null);
    }

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    public Course getCouseByTitle(String title){
        return courseRepository.findByTitle(title);
    }
}
