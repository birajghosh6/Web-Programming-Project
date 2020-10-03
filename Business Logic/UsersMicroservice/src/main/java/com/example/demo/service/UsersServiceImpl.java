package com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UsersRepository;

@Service
public class UsersServiceImpl implements UsersService{
	
	@Autowired
	UsersRepository usersRepository;
	
	@Override
	public List<User> getAllUsers() {
		return usersRepository.findAll();
	}
	
	@Override
	public boolean isValidUser(User user) {
		try {
			User loggedUser = usersRepository.findById(user.getUserId()).get();
			return loggedUser.getUserId().equals(user.getUserId()) && loggedUser.getPassword().equals(user.getPassword());
		}
		catch(IllegalArgumentException e) {
			return false;
		}
		catch(NoSuchElementException e) {
			return false;
		}
	}
}
