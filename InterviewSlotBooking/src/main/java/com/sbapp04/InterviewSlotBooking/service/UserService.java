package com.sbapp04.InterviewSlotBooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sbapp04.InterviewSlotBooking.entity.User;
import com.sbapp04.InterviewSlotBooking.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    // SAVE USER
    
    public User save(User user) {

        // Prevent duplicate email
        if (repo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // Default role
        if (user.getRole() == null) {
            user.setRole("ROLE_USER");
        }

        return repo.save(user);
    }

    
    // FIND USER BY EMAIL
    
    public User findByEmail(String email) {

        return repo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
 
 // FIND USER BY ID
 
 public User findById(Long id) {

     return repo.findById(id)
             .orElseThrow(() ->
                     new RuntimeException(
                             "User not found"
                     )
             );
 }
}