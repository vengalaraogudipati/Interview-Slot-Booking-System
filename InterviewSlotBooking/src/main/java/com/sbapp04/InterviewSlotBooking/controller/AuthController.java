package com.sbapp04.InterviewSlotBooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbapp04.InterviewSlotBooking.entity.User;
import com.sbapp04.InterviewSlotBooking.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    
    // REGISTER
    
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        user.setRole("ROLE_USER");  // ✅ IMPORTANT FIX

        return userService.save(user);  // return saved object
    }

    
    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getEmail(),
                                user.getPassword()
                        )
                );

        if (authentication.isAuthenticated()) {

            return userService.findByEmail(
                    user.getEmail()
            );
        }

        throw new RuntimeException(
                "Invalid Email or Password"
        );
    }
}