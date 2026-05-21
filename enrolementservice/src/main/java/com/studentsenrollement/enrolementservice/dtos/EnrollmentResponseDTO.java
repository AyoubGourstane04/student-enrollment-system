package com.studentsenrollement.enrolementservice.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollmentResponseDTO {
    private Long enrollmentId;
    private String studentCnie;
    private String courseName;
    private String date;
    private boolean deletable;
}
