package com.example.demo.repository;

import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long>{

    @Query(value = "SELECT * FROM rating r WHERE r.user_id = ?1", nativeQuery = true)
    List<Rating> findAll(String userid);
}