package com.studentsenrollement.enrolementservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            StudentNotFoundException.class,
            EnrolmentNotFoundException.class,
            ClassNotFoundException.class
    })
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFoundException(RuntimeException ex){
        return new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler({
            EnrolmentDeletionException.class,
            ClassFullException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBadRequestException(RuntimeException ex){
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(NoResourceFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNoResourceFound(NoResourceFoundException ex) {

        String errorMessage = "The requested endpoint '/" + ex.getResourcePath() + "' does not exist.";

        return new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                errorMessage,
                LocalDateTime.now()
        );
    }


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGlobalException(Exception ex) {
        return new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred. Please try again later.",
                LocalDateTime.now()
        );
    }

    public record ErrorResponse(int status, String message, LocalDateTime timestamp){}
}
