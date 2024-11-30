// src/main/java/com/example/demo/EmailService.java

package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// You can enhance this service to send HTML emails or use templating engines.
@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@yourdomain.com"); // Replace with your email   
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public void sendConfirmationEmail(String to, String subject, String text) {
	SimpleMailMessage message = new SimpleMailMessage();
	message.setFrom("hawktuah.incorporated@gmail.com"); // Replace with your email            
	message.setTo(to);
	message.setSubject(subject);
	message.setText(text);
	mailSender.send(message);
    }


    public void sendRegistrationConfirmationEmail(String toEmail, String userName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Registration Confirmation");
        message.setText("Hello " + userName + ",\n\nThank you for registering! We're excited to have you on board.\n\nBest regards,\nCinema Booking Team");
        mailSender.send(message);
    }
}
