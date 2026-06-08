package com.studentsenrollement.enrolementservice.exceptions;

public class EnrolmentNotFoundException extends RuntimeException {
    public EnrolmentNotFoundException(String message) {
        super(message);
    }
}
