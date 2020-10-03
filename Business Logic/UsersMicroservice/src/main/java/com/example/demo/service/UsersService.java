package com.example.demo.service;

import java.util.List;

import com.example.demo.model.User;

public interface UsersService {
	
	public List<User> getAllUsers();
	public boolean isValidUser(User user);

}
