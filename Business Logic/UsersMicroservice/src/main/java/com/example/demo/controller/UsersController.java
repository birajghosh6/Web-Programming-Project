package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UsersService;

@RestController
@RequestMapping(path="/login")
public class UsersController {
	
	@Autowired
	UsersService usersService;
	
	@GetMapping("/allUsers")
	public List<User> getAllUsers() {
		return usersService.getAllUsers();
	}
	
	@PostMapping("/checkUser")
	public boolean isValidUser(@RequestBody User user) {
		return usersService.isValidUser(user);
	}
	
}
