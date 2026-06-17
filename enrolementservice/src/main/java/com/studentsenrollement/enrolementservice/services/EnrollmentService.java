package com.studentsenrollement.enrolementservice.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.studentsenrollement.enrolementservice.exceptions.ClassFullException;
import com.studentsenrollement.enrolementservice.exceptions.ClassNotFoundException;
import com.studentsenrollement.enrolementservice.exceptions.EnrolmentDeletionException;
import com.studentsenrollement.enrolementservice.exceptions.EnrolmentNotFoundException;
import com.studentsenrollement.enrolementservice.exceptions.StudentNotFoundException;
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
    private final StudentClient studentClient;
    private final CourseClient courseClient;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, StudentClient studentClient, CourseClient courseClient){
        this.enrollmentRepository = enrollmentRepository;
        this.studentClient = studentClient;
        this.courseClient = courseClient;
    }


    public List<EnrollmentResponseDTO> getEnrollementsByStudentId(Long studentId){
        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);

        if(enrollments.isEmpty()){
            throw new StudentNotFoundException("Student with id: " + studentId + " not found");
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
                                                .date(enrollment.getEnrollmentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")))
                                                .deletable(isdeletable)
                                                .build();


            responses.add(res);
        }

        return responses;
    }

    public List<EnrollmentResponseDTO> getEnrollementsByStudentCnie(String cnie){

        Long studentId = studentClient.getStudentByCnie(cnie);

        if(studentId == null){
            throw new StudentNotFoundException("Student with cnie: " + cnie + " not found");
        }

        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);


        List<EnrollmentResponseDTO> responses = new ArrayList<>();

        for(Enrollment enrollment: enrollments){

            String studentCnie = studentClient.getStudentById(enrollment.getStudentId());
            String courseName = courseClient.getCourseById(enrollment.getCourseId());
            


            boolean isdeletable = enrollment.getEnrollmentDate().plusHours(24).isAfter(LocalDateTime.now());

            EnrollmentResponseDTO res = EnrollmentResponseDTO.builder()
                                                .enrollmentId(enrollment.getId())
                                                .courseName(courseName)
                                                .studentCnie(studentCnie)
                                                .date(enrollment.getEnrollmentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")))
                                                .deletable(isdeletable)
                                                .build();
            responses.add(res);
        }

        return responses;
    }



    public EnrollmentResponseDTO enroll(EnrollmentRequest request){
        String studentCnie = request.getStudentCnie();
        String courseTitle = request.getCourseTitle();


        Long studentId = studentClient.getStudentByCnie(studentCnie);
        Long courseId = courseClient.getCourseByTitle(courseTitle);

        if(studentId == null){
            throw new StudentNotFoundException("Student with cnie: " + studentCnie + " not found");
        }

        if(courseId == null){
            throw new ClassNotFoundException("Class with title : " + courseTitle + " not found");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrollmentDate(LocalDateTime.now());

        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);
        

        if(enrollments.size() == 3){
            throw new ClassFullException("Class " + courseTitle + " is full.");
        }

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);

        

        return EnrollmentResponseDTO.builder()
                                .enrollmentId(savedEnrollment.getId())
                                .studentCnie(studentCnie)
                                .courseName(courseTitle)
                                .date(savedEnrollment.getEnrollmentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")))
                                .deletable(true)
                                .build();
    }


    public Enrollment getEnrollmentById(Long id){
        return enrollmentRepository.findById(id).orElseThrow(() -> new EnrolmentNotFoundException("Enrolment with ID: " + id + " not found"));
    }


    public void deleteEnrollementById(Long id) {
        Enrollment enrollment = getEnrollmentById(id);

        boolean isdeletable = enrollment.getEnrollmentDate().plusHours(24).isAfter(LocalDateTime.now());

        if(isdeletable){
            enrollmentRepository.deleteById(id);
        }else{
            throw new EnrolmentDeletionException("Cannot delete enrollment " + id + ". The 24-hour time limit has expired.");
        }
    }



    public List<String> getAllCourses(String cnie) {
        Long studentId = studentClient.getStudentByCnie(cnie);

        if(studentId == null){
            throw new StudentNotFoundException("Student with cnie: " + cnie + " not found");
        }

        List<Enrollment> studentEnrollements = enrollmentRepository.findByStudentId(studentId);

        List<String> allCourses = courseClient.getAllCourses();

        if(studentEnrollements.isEmpty()){
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
