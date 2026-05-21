package com.studentsenrollement.enrolementservice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studentsenrollement.enrolementservice.models.Enrollment;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long>{

    List<Enrollment> findByCourseId(Long courseId);

    List<Enrollment> findByStudentId(Long studentId);
}
