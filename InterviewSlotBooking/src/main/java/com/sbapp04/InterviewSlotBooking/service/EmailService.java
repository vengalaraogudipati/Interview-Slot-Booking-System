package com.sbapp04.InterviewSlotBooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    
    // SEND EMAIL
    
    public void sendMail(String to,
                         String subject,
                         String message) {

        try {

            SimpleMailMessage mail = new SimpleMailMessage();

            mail.setTo(to);
            mail.setSubject(subject);
            mail.setText(message);

            mailSender.send(mail);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to send email: " + e.getMessage()
            );
        }
    }
}