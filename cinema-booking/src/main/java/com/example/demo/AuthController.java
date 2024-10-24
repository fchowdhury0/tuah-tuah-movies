package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository; // Ensure this is autowired
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Ensure this is autowired

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository; // Add this
    
    @Autowired
    private EmailService emailService; // Add this

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            // Set the authenticated user in the SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Retrieve the UserDetails of the authenticated user
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Generate the JWT token using the username from UserDetails
            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            // Return the JWT token in the response
            return ResponseEntity.ok(new AuthResponse(jwt));

        } catch (BadCredentialsException e) {
            // Incorrect credentials provided
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        } catch (AuthenticationException e) {
            // Other authentication failures
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        // Check if username already exists
        if(userRepository.findByUsername(registrationRequest.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        // Check if email already exists
        if(userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        // Create a new user instance
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setPasswordHash(passwordEncoder.encode(registrationRequest.getPassword()));

        // Save the user to the database
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    // Forgot Password Endpoint
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody PasswordResetRequest passwordResetRequest) {
        // Find user by email
        User user = userRepository.findByEmail(passwordResetRequest.getEmail())
                        .orElse(null);
        if (user == null) {
            // For security, don't reveal if the email exists
            return ResponseEntity.status(HttpStatus.OK).body("If that email is in our system, we have sent a password reset link.");
        }

        // Generate a unique token
        String token = UUID.randomUUID().toString();

        // Set token expiry (e.g., 1 hour)
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.HOUR, 1);
        Date expiryDate = cal.getTime();

        // Create and save PasswordResetToken
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user, expiryDate);
        passwordResetTokenRepository.save(passwordResetToken);

        // Create reset URL
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;

        // Send email
        String subject = "Password Reset Request";
        String message = "Dear " + user.getFirstName() + ",\n\n"
                       + "We received a request to reset your password. Please click the link below to reset your password:\n\n"
                       + resetUrl + "\n\n"
                       + "This link will expire in 1 hour.\n\n"
                       + "If you did not request a password reset, please ignore this email.\n\n"
                       + "Best regards,\nYour Company Name";

        emailService.sendSimpleMessage(user.getEmail(), subject, message);

        return ResponseEntity.status(HttpStatus.OK).body("If that email is in our system, we have sent a password reset link.");
    }

    // Reset Password Endpoint
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        // Find the token
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(passwordUpdateRequest.getToken())
                                        .orElse(null);
        if (resetToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password reset token.");
        }

        // Check if token is expired
        if (resetToken.getExpiryDate().before(new Date())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password reset token has expired.");
        }

        // Get the user associated with the token
        User user = resetToken.getUser();

        // Update the user's password
        user.setPasswordHash(passwordEncoder.encode(passwordUpdateRequest.getNewPassword()));
        userRepository.save(user);

        // Delete the token to prevent reuse
        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.status(HttpStatus.OK).body("Password has been reset successfully.");
    }
}