package com.studentsenrollement.enrolementservice.exceptions;

public class ClassFullException extends RuntimeException {
    public ClassFullException(String message) {
        super(message);
    }
}
