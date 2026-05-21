package com.studentsenrollement.courseservice.controllers;

import com.studentsenrollement.courseservice.models.Course;
import com.studentsenrollement.courseservice.services.CourseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses/")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable("id") Long id){
        return courseService.getCourseById(id);
    }

    @GetMapping("/all")
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    @GetMapping("/title/{title}")
    public Course getCourseByTitle(@PathVariable("title") String title){
        return courseService.getCouseByTitle(title);
    }
}
