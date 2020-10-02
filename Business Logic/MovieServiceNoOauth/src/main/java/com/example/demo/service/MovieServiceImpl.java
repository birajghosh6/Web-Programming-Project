package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Movie;
import com.example.demo.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService {


    @Autowired
    MovieRepository movieRepository;

    @Override
    public Movie addMovie(Movie movie) {
        
        return movieRepository.save(movie);
    }

    @Override
    public Movie addOrUpdateMovie(Movie movie) {
       
        return movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(Long movieId) {
        
        //Movie mv = movieRepository.getOne(movieId);
        //movieRepository.delete(mv);
        movieRepository.deleteById(movieId);

    }

    @Override
    public Movie getMovie(Long movieid) {
       
        //return movieRepository.getOne(movieid);
    	return movieRepository.findById(movieid).get();
    }

    @Override
    public List<Movie> getallMovies() {
        
        return movieRepository.findAll();
    }
    
}