package com.studentsenrollement.studentservice.controllers;

import com.studentsenrollement.studentservice.models.Student;
import com.studentsenrollement.studentservice.services.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/students/")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable("id") Long id){
        return studentService.getStudentById(id);
    }

    @GetMapping("/cnie/{cnie}")
    public Student getStudentByCnie(@PathVariable("cnie") String cnie){
        return studentService.getStudentByCnie(cnie);
    }

    @GetMapping("/all")
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

}
