package com.example.demo.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.JwtUtil;
import com.example.demo.dto.JwtResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegistrationRequest;
import com.example.demo.entity.PaymentCard;
import com.example.demo.entity.User;
import com.example.demo.entity.UserPaymentCard;
import com.example.demo.repository.PaymentCardRepository;
import com.example.demo.repository.UserPaymentCardRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Autowired
    private UserPaymentCardRepository userPaymentCardRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // authentication.getPrincipal() returns a UserDetails, not your JPA User
            Object principal = authentication.getPrincipal();
            if (!(principal instanceof org.springframework.security.core.userdetails.User)) {
                // If it's not the default Spring Security UserDetails, handle accordingly
                logger.error("Principal is not an instance of UserDetails");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication error");
            }

            // Extract username from the UserDetails
            org.springframework.security.core.userdetails.User springUserDetails = 
                (org.springframework.security.core.userdetails.User) principal;
            String username = springUserDetails.getUsername();

            // Now load the User entity from the database
            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found in the database"));

            // Generate JWT token with role
            String jwt = jwtUtil.generateTokenWithRole(user.getUsername(), user.getRole());

            logger.info("User logged in: " + username);

            // Return JWT token in response
            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (DisabledException ex) {
            logger.warn("User account is not activated: " + loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account is not activated. Please check your email.");
        } catch (Exception ex) {
            logger.error("Login failed for user: " + loginRequest.getUsername(), ex);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        logger.info("Registering user: " + registrationRequest.getUsername());

        try {
            // Check if username already exists
            if (userRepository.findByUsername(registrationRequest.getUsername()).isPresent()) {
                logger.warn("Registration failed: Username already exists - " + registrationRequest.getUsername());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
            }

            // Check if email already exists
            if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
                logger.warn("Registration failed: Email already exists - " + registrationRequest.getEmail());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
            }

            // Check if passwords match
            if (!registrationRequest.getPassword().equals(registrationRequest.getConfirmPassword())) {
                logger.warn("Registration failed: Passwords do not match for user - " + registrationRequest.getUsername());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords do not match");
            }

            // Create a new user instance
            User user = new User();
            user.setUsername(registrationRequest.getUsername());
            user.setEmail(registrationRequest.getEmail());
            user.setFirstName(registrationRequest.getFirstName());
            user.setLastName(registrationRequest.getLastName());
            user.setPasswordHash(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setRole(registrationRequest.getRole());
            user.setIsSubscribed(registrationRequest.isIsSubscribed());
            user.setStatus(false);

            // Save the user to the database
            userRepository.save(user);
            logger.info("User registered successfully (inactive): " + registrationRequest.getUsername());

            // Generate verification token
            String activationToken = jwtUtil.generateActivationToken(user);

            // Send confirmation email
            emailService.sendRegistrationEmail(user.getEmail(), activationToken);
            logger.info("Activation email sent to: " + user.getEmail());

            // Handle Credit Card
            RegistrationRequest.CreditCardData creditCardRequest = registrationRequest.getCreditCard();
            if (creditCardRequest != null && creditCardRequest.isSaveCard()) {
                try {
                    logger.info("Processing payment card for user: " + registrationRequest.getUsername());

                    // Parse expiry date
                    LocalDate expiry;
                    try {
                        expiry = LocalDate.parse(
                            "01/" + creditCardRequest.getExpiryDate(),
                            DateTimeFormatter.ofPattern("dd/MM/yy")
                        );
                        logger.info("Parsed expiry date: " + expiry);
                    } catch (DateTimeParseException e) {
                        logger.error("Invalid expiry date format for user: " + registrationRequest.getUsername(), e);
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expiry date format");
                    }

                    // Hash the CVV
                    String hashedCvv;
                    try {
                        hashedCvv = passwordEncoder.encode(creditCardRequest.getCvv());
                        logger.info("Hashed CVV for user: " + registrationRequest.getUsername());
                    } catch (Exception e) {
                        logger.error("Error hashing CVV for user: " + registrationRequest.getUsername(), e);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing CVV");
                    }

                    // Create PaymentCard entity
                    PaymentCard paymentCard = new PaymentCard();
                    paymentCard.setCardNumber(creditCardRequest.getCardNumber());
                    paymentCard.setCardExp(expiry);
                    paymentCard.setCardBillingAddress(creditCardRequest.getBillingAddress());
                    paymentCard.setCardZip(creditCardRequest.getZip());
                    paymentCard.setCardCity(creditCardRequest.getCity());
                    paymentCard.setCardState(creditCardRequest.getState());
                    paymentCard.setCvvHash(hashedCvv); // Store hashed CVV
                    paymentCard.setFirstName(user.getFirstName());
                    paymentCard.setLastName(user.getLastName());
                    paymentCard.setSaveCard(creditCardRequest.isSaveCard());

                    logger.info("Saving PaymentCard entity...");
                    paymentCard = paymentCardRepository.saveAndFlush(paymentCard); // Ensure the payment card is saved and flushed
                    logger.info("Payment card saved for user: " + registrationRequest.getUsername() + " with card ID: " + paymentCard.getCardId());

                    // Link PaymentCard to User
                    UserPaymentCard userPaymentCard = new UserPaymentCard(user, paymentCard);
                    logger.info("Linking PaymentCard to User...");
                    userPaymentCardRepository.save(userPaymentCard);
                    logger.info("Payment card linked to user: " + registrationRequest.getUsername());

                } catch (Exception e) {
                    logger.error("Error processing payment card for user: " + registrationRequest.getUsername(), e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing payment card");
                }
            } else {
                logger.info("Skipping payment card processing for user: " + registrationRequest.getUsername());
            }

            return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registration successful. Please check your email to activate your account.");

        } catch (DataIntegrityViolationException ex) {
            logger.error("Data integrity violation: ", ex);
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Data integrity violation: " + ex.getMostSpecificCause().getMessage());
        } catch (Exception ex) {
            logger.error("An error occurred during registration: ", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred during registration.");
        }
    }

    @GetMapping("/api/auth/activate-account")
    public ResponseEntity<?> activateUserAccount(@RequestParam("token") String token) {
        logger.info("Account activation initiated with token: {}", token);

        try {
	    logger.info("entered try block");
            String username = jwtUtil.extractUsername(token);

            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Invalid activation token"));

            if (user.getStatus()) {
                logger.warn("User account is already activated: " + username);
                return ResponseEntity.badRequest().body("Account is already activated.");
            }

            user.setStatus(true);
	    System.out.println("user set status to true");
	    //	    user.setIsSubscribed(true);
	    //	    logger.info("Setting is_subscribed to true for user: {}", username);
            userRepository.save(user);
            logger.info("User account activated: " + username);

            return ResponseEntity.ok("Account activated successfully. You can now log in.");

        } catch (Exception ex) {
            logger.error("Account activation failed: ", ex);
            return ResponseEntity.badRequest().body("Invalid or expired activation token.");
        }
    }

    // Other methods...
}
