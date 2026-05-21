package com.studentsenrollement.enrolementservice.clients;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;



@Component
public class CourseClient {
    private final WebClient webClient;

    public CourseClient(WebClient.Builder builder){
        this.webClient = builder.baseUrl("http://courseservice").build();
    }

    public String getCourseById(Long id){
        return webClient.get()
                .uri("/api/courses/{id}", id)
                .retrieve()
                .bodyToMono(Map.class)
                .map(map -> String.valueOf(map.get("title")))
                .block();
    }

    public Long getCourseByTitle(String title){
        return webClient.get()
                .uri("/api/courses/title/{title}", title)
                .retrieve()
                .bodyToMono(Map.class)
                .map(map -> Long.valueOf(String.valueOf(map.get("id"))))
                .block();
    }

    public List<String> getAllCourses() {
        return webClient.get()
                    .uri("/api/courses/all")
                    .retrieve()
                    .bodyToFlux(Map.class)
                    .map(courseMap -> String.valueOf(courseMap.get("title")))
                    .collectList()
                    .block();
    }
}
