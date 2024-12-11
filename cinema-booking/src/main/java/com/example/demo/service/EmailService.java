package com.example.demo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.PasswordResetTokenRepository;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private static final String FROM_EMAIL = "hawktuah.incorporated@gmail.com";

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Simple email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Error sending simple email to {}: {}", to, e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void sendConfirmationEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Confirmation email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Error sending confirmation email to {}: {}", to, e.getMessage());
            throw new RuntimeException("Failed to send confirmation email", e);
        }
    }

    public void sendRegistrationEmail(String to, String activationToken) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject("Confirm Your Account - Hawk Tuah Movies");
            String activationLink = "http://localhost:8080/api/auth/activate-account?token=" + activationToken;
            String text = String.format("""
                Welcome to Hawk Tuah Movies!

                Please activate your account by clicking on the link below:
                %s

                If you did not create this account, please ignore this email.

                Best regards,
                Hawk Tuah Movies Team
                """, activationLink);
            message.setText(text);
            mailSender.send(message);
            logger.info("Registration email sent to: {}", to);
        } catch (Exception e) {
            logger.error("Error sending registration email to {}: {}", to, e.getMessage());
            throw new RuntimeException("Failed to send registration email", e);
        }
    }

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public void sendForgotPasswordEmail(User user, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(user.getEmail());
            message.setSubject("Password Reset Request");
            String resetLink = "http://localhost:3000/reset-password?token=" + token;
            String text = String.format("""
                Hello %s,

                You have requested to reset your password.
                Please click on the link below to reset your password:
                %s

                If you did not request this password reset, please ignore this email.

                Best regards,
                Hawk Tuah Movies Team
                """, user.getFirstName(), resetLink);
            message.setText(text);
            mailSender.send(message);
            logger.info("Password reset email sent to: {}", user.getEmail());
        } catch (Exception e) {
            logger.error("Error sending password reset email to {}: {}", user.getEmail(), e.getMessage());
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }
}