package com.studentsenrollement.enrolementservice.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.studentsenrollement.enrolementservice.clients.CourseClient;
import com.studentsenrollement.enrolementservice.clients.StudentClient;
import com.studentsenrollement.enrolementservice.dtos.EnrollmentRequest;
import com.studentsenrollement.enrolementservice.dtos.EnrollmentResponseDTO;
import com.studentsenrollement.enrolementservice.models.Enrollment;
import com.studentsenrollement.enrolementservice.repositories.EnrollmentRepository;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private StudentClient studentClient;
    private CourseClient courseClient;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, StudentClient studentClient, CourseClient courseClient){
        this.enrollmentRepository = enrollmentRepository;
        this.studentClient = studentClient;
        this.courseClient = courseClient;
    }


    public List<EnrollmentResponseDTO> getEnrollementsByStudentId(Long studentId) {
        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);

        if(enrollments.isEmpty()){
            //TODO: HANDLE ERRORS
            System.out.println("STUDENT ID NOT FOUND");
            return null;
        }

        List<EnrollmentResponseDTO> responses = new ArrayList<>();

        for(Enrollment enrollment: enrollments){

            String studentCnie = studentClient.getStudentById(enrollment.getStudentId());
            String courseName = courseClient.getCourseById(enrollment.getCourseId());
            


            boolean isdeletable = enrollment.getEnrollmentDate().plusHours(24).isAfter(LocalDateTime.now());

            EnrollmentResponseDTO res = EnrollmentResponseDTO.builder()
                                                .enrollmentId(enrollment.getId())
                                                .courseName(courseName)
                                                .studentCnie(studentCnie)
                                                .date(enrollment.getEnrollmentDate().toString())
                                                .deletable(isdeletable)
                                                .build();


            responses.add(res);
        }

        return responses;
    }

    public List<EnrollmentResponseDTO> getEnrollementsByStudentCnie(String cnie) {

        Long studentId = studentClient.getStudentByCnie(cnie);

        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);

        if(enrollments.isEmpty()){
            //TODO: HANDLE ERRORS
            System.out.println("STUDENT ID NOT FOUND");
            return null;
        }

        List<EnrollmentResponseDTO> responses = new ArrayList<>();

        for(Enrollment enrollment: enrollments){

            String studentCnie = studentClient.getStudentById(enrollment.getStudentId());
            String courseName = courseClient.getCourseById(enrollment.getCourseId());
            


            boolean isdeletable = enrollment.getEnrollmentDate().plusHours(24).isAfter(LocalDateTime.now());

            EnrollmentResponseDTO res = EnrollmentResponseDTO.builder()
                                                .enrollmentId(enrollment.getId())
                                                .courseName(courseName)
                                                .studentCnie(studentCnie)
                                                .date(enrollment.getEnrollmentDate().toString())
                                                .deletable(isdeletable)
                                                .build();


            responses.add(res);
        }

        return responses;
    }


    // public List<String> getAllCourses(Long studentId) {
    //     List<Enrollment> enrollments = enrollmentRepository.findAll();

    //     List<Enrollment> studentEnrollements = enrollmentRepository.findByStudentId(studentId);

    //     if(studentEnrollements == null){
    //         //TODO:HANDLE ERROR
    //         System.out.println("Student ID not found");
    //         return null;
    //     }


    //     List<String> courses = new ArrayList<>();

    //     for(Enrollment enrollment: enrollments){
            
    //         if(studentEnrollements.contains(enrollment)) continue;

    //         String courseTitle =  courseClient.getCourseById(enrollment.getCourseId());

    //         courses.add(courseTitle);
    //     }

    //     return courses;
    // }


    public EnrollmentResponseDTO enroll(EnrollmentRequest request) {
        String studentCnie = request.getStudentCnie();
        String courseTitle = request.getCourseTitle();


        Long studentId = studentClient.getStudentByCnie(studentCnie);
        Long courseId = courseClient.getCourseByTitle(courseTitle);




        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrollmentDate(LocalDateTime.now());

        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);
        

        if(enrollments.size() == 3){
            //TODO: HANDLE ERRORS
            System.out.println("Error cannot enroll class is full");
            return null;
        }

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);

        

        return EnrollmentResponseDTO.builder()
                                .enrollmentId(savedEnrollment.getId())
                                .studentCnie(studentCnie)
                                .courseName(courseTitle)
                                .date(savedEnrollment.getEnrollmentDate().toString())
                                .deletable(true)
                                .build();
    }


    public Enrollment getEnrollmentById(Long id) {
        //TODO: HANDLE ERRORS
        return enrollmentRepository.findById(id).orElse(null);
    }


    public void deleteEnrollementById(Long id) {
        Enrollment enrollment = getEnrollmentById(id);

        if(enrollment == null){
            //TODO: HANDLE ERRORS
            System.out.println("ID NOT FOUND");
            return;
        }

        
        
        boolean isdeletable = enrollment.getEnrollmentDate().plusHours(24).isAfter(LocalDateTime.now());
 
        if(isdeletable){
            enrollmentRepository.deleteById(id);
        }else{
            //TODO: HANDLE ERRORS
            System.out.println("Cannot delete the enrollement!");
            return;
        }        
    }



    public List<String> getAllCourses(String cnie) {
        Long studentId = studentClient.getStudentByCnie(cnie);

        List<Enrollment> studentEnrollements = enrollmentRepository.findByStudentId(studentId);

        List<String> allCourses = courseClient.getAllCourses();

        if(studentEnrollements.isEmpty() || studentEnrollements == null){
            return allCourses;
        }

        List<String> coursesEnrolledIn = studentEnrollements.stream()
                                        .map(elm -> courseClient.getCourseById(elm.getCourseId()))
                                        .toList();


        List<String> courses = new ArrayList<>();

        for(String course: allCourses){
            if(coursesEnrolledIn.contains(course)) continue;

            courses.add(course);
        }

        return courses;
    }








}
