package com.studentsenrollement.enrolementservice.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class EnrollmentRequest {
    private String studentCnie;
    private String courseTitle;

}
