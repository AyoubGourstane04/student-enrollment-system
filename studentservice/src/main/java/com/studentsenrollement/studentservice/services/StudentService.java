package com.studentsenrollement.studentservice.services;

import com.studentsenrollement.studentservice.models.Student;
import com.studentsenrollement.studentservice.repositories.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student getStudentById(Long id){
        return studentRepository.findById(id).orElse(null);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Student getStudentByCnie(String cnie) {
        return studentRepository.findByCnie(cnie);
    }
}
