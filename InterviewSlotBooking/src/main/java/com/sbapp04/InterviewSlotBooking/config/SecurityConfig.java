package com.sbapp04.InterviewSlotBooking.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.sbapp04.InterviewSlotBooking.service.CustomUserDetailsService;

@Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

 
    // PASSWORD ENCODER
    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    
    // AUTH MANAGER
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config)
            throws Exception {

        return config.getAuthenticationManager();
    }

    
    // SECURITY FILTER
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http

            // Disable CSRF for React APIs
            .csrf(csrf -> csrf.disable())

            // Enable CORS
            .cors(cors -> {})

            // Session policy
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS))

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                    // Public APIs
            		.requestMatchers(
            		        "/",
            		        "/api/auth/**",
            		        "/api/slots/**",
            		        "/api/bookings/**"
            		).permitAll()

                    // Admin APIs
                    .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")

                    // User APIs
                    .requestMatchers("/api/user/**")
                    .hasAnyRole("USER", "ADMIN")

                    // Everything else
                    .anyRequest()
                    .authenticated()
            )

            // Disable default login form
            .formLogin(form -> form.disable())

            // Disable HTTP basic
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}