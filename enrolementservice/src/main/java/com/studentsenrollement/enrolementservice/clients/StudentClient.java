package com.studentsenrollement.enrolementservice.clients;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;



@Component
public class StudentClient {
    private final WebClient webClient;

    public StudentClient(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://studentservice").build();
    }

    public String getStudentById(Long id){
        return webClient.get()
                .uri("/api/students/{id}", id)
                .retrieve()
                .bodyToMono(Map.class)
                .map(map -> String.valueOf(map.get("cnie")))
                .block();
    }


    public Long getStudentByCnie(String cnie){
        return webClient.get()
                .uri("/api/students/cnie/{cnie}", cnie)
                .retrieve()
                .bodyToMono(Map.class)
                .map(map -> Long.valueOf(String.valueOf(map.get("id"))))
                .block();
    }
}
