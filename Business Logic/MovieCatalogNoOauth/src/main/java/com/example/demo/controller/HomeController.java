package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:9080", maxAge = 3600)
@RestController
@RequestMapping("/catalog")
public class HomeController {
    
    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/showmovies")
    public Object[] showAllMovies(){
        
        ResponseEntity<Object[]> responseEntity = restTemplate.getForEntity("http://localhost:9090/movieservice/allmovies", Object[].class);
        Object[] objects = responseEntity.getBody();
        return objects;
    }

    @GetMapping("/showratedmovie/{userId}")
    public Object[] showAllRatedMovies(@PathVariable String userId){
        ResponseEntity<Object[]> responseEntity = restTemplate.getForEntity("http://localhost:9092/ratingservice/allratings/" + userId, Object[].class);
        Object[] objects = responseEntity.getBody();
        return objects;
    }
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
}