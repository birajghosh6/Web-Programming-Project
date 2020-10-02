package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Rating;
import com.example.demo.repository.RatingRepository;

@Service
public class RatingServiceImpl implements RatingService {
	
	@Autowired
    RatingRepository ratingRepository;

    @Override
    public Rating addOrUpdateRating(Rating rating) {
       
        return ratingRepository.save(rating);
    }

    @Override
    public Rating addRating(Rating rating) {
       
        return ratingRepository.save(rating);
    }

    @Override
    public void deleteRating(long ratingId) {
       
        Rating rn = ratingRepository.getOne(ratingId);
        ratingRepository.delete(rn);

    }

    @Override
    public Rating getRating(long ratingId) {
        
        return ratingRepository.getOne(ratingId);
    }

    @Override
    public List<Rating> getUserRatings(String userId) {
       
        return ratingRepository.findAll(userId); //return all ratings of specified userid only.
    }

    
}
