package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegistrationRequest {
    
    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Confirm Password is required")
    private String confirmPassword;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Role is required")
    private String role;

    private boolean isSubscribed;

    private CreditCardData creditCard;

    // Getters and Setters...

    public static class CreditCardData {
        @NotBlank(message = "Card number is required")
        @Pattern(regexp = "\\d{16}", message = "Card number must be 16 digits")
        private String cardNumber;

        @NotBlank(message = "Expiry date is required")
        @Pattern(regexp = "(0[1-9]|1[0-2])/\\d{2}", message = "Expiry date must be in MM/YY format")
        private String expiryDate;

        @NotBlank(message = "CVV is required")
        @Pattern(regexp = "\\d{3,4}", message = "CVV must be 3 or 4 digits")
        private String cvv;

        @NotBlank(message = "Cardholder name is required")
        private String cardholderName;

        @NotBlank(message = "Billing address is required")
        private String billingAddress;

        @NotBlank(message = "ZIP code is required")
        @Pattern(regexp = "\\d{5}", message = "ZIP code must be 5 digits")
        private String zip;

        @NotBlank(message = "City is required")
        private String city;

        @NotBlank(message = "State is required")
        @Pattern(regexp = "^[A-Z]{2}$", message = "State must be a valid 2-letter code")
        private String state;

        private boolean saveCard;

        // Getters and Setters...

        public String getCardNumber() {
            return cardNumber;
        }

        public void setCardNumber(String cardNumber) {
            this.cardNumber = cardNumber;
        }

        public String getExpiryDate() {
            return expiryDate;
        }

        public void setExpiryDate(String expiryDate) {
            this.expiryDate = expiryDate;
        }

        public String getCvv() {
            return cvv;
        }

        public void setCvv(String cvv) {
            this.cvv = cvv;
        }

        public String getCardholderName() {
            return cardholderName;
        }

        public void setCardholderName(String cardholderName) {
            this.cardholderName = cardholderName;
        }

        public String getBillingAddress() {
            return billingAddress;
        }

        public void setBillingAddress(String billingAddress) {
            this.billingAddress = billingAddress;
        }

        public String getZip() {
            return zip;
        }

        public void setZip(String zip) {
            this.zip = zip;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        public boolean isSaveCard() {
            return saveCard;
        }

        public void setSaveCard(boolean saveCard) {
            this.saveCard = saveCard;
        }
    }

    // Getters and Setters...

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getEmail() {
        return email;
    }
        
    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
 
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }
 
    public void setRole(String role) {
        this.role = role;
    }

    public boolean isIsSubscribed() {
        return isSubscribed;
    }

    public void setIsSubscribed(boolean isSubscribed) {
        this.isSubscribed = isSubscribed;
    }
    
    public CreditCardData getCreditCard() {
        return creditCard;
    }
    
    public void setCreditCard(CreditCardData creditCard) {
        this.creditCard = creditCard;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}