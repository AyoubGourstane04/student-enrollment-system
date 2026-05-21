package com.studentsenrollement.enrolementservice.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentsenrollement.enrolementservice.dtos.EnrollmentRequest;
import com.studentsenrollement.enrolementservice.dtos.EnrollmentResponseDTO;
import com.studentsenrollement.enrolementservice.models.Enrollment;
import com.studentsenrollement.enrolementservice.services.EnrollmentService;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService){
        this.enrollmentService = enrollmentService;
    }


    @GetMapping("/{id}")
    public Enrollment getEnrollmentById(@PathVariable("id") Long id){
        return enrollmentService.getEnrollmentById(id);
    }

    @GetMapping("/student/{studentId}")
    public List<EnrollmentResponseDTO> getEnrollementsByStudentId(@PathVariable("studentId") Long studentId){
        return enrollmentService.getEnrollementsByStudentId(studentId);
    }

    @GetMapping("/student-cnie/{studentCnie}")
    public List<EnrollmentResponseDTO> getEnrollementsByStudentCnie(@PathVariable("studentCnie") String studentCnie){
        return enrollmentService.getEnrollementsByStudentCnie(studentCnie);
    }

    @GetMapping("/courses/{studentCnie}")
    public List<String> getAllCoursesNotEnrolledIn(@PathVariable("studentCnie")String studentCnie){
        return enrollmentService.getAllCourses(studentCnie);
    }


    @PostMapping("/enroll")
    public EnrollmentResponseDTO enroll(@RequestBody EnrollmentRequest request){
        return enrollmentService.enroll(request);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> removeEnrollementById(@PathVariable("id") Long id){
        enrollmentService.deleteEnrollementById(id);
        return ResponseEntity.noContent().build();
    }


    // @GetMapping("/courses/{studentId}")
    // public List<String> getAllCoursesNotEnrolledIn(@PathVariable("studentId")Long studentId){
    //     return enrollmentService.getAllCourses(studentId);
    // }



}
