package com.example.demo.service;

import java.util.List;

import com.example.demo.model.Movie;

public interface MovieService {
    
    public List<Movie> getallMovies(); //user

    public Movie getMovie(Long movieid); //user

    public Movie addMovie(Movie movie); //Admin only

    public void deleteMovie(Long movieId); //Admin only

    public Movie addOrUpdateMovie(Movie movie); //admin only

}