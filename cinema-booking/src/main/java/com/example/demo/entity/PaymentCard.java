package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_card")
public class PaymentCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long cardId;

    @Column(name = "card_number", unique = true, nullable = false)
    private String cardNumber;

    @Column(name = "card_exp", nullable = false)
    private LocalDate cardExp;

    @Column(name = "card_billing_address", nullable = false)
    private String cardBillingAddress;

    @Column(name = "card_zip", nullable = false)
    private String cardZip;

    @Column(name = "card_city", nullable = false)
    private String cardCity;

    @Column(name = "card_state", nullable = false)
    private String cardState;

    @Column(name = "cvv", nullable = false)
    private String cvv;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "save_card", nullable = false)
    private boolean saveCard = false;

    // Constructors
    public PaymentCard() {}

    public PaymentCard(String cardNumber, LocalDate cardExp, String cardBillingAddress,
                       String cardZip, String cardCity, String cardState,
                       String cvv, String firstName, String lastName, boolean saveCard) {
        this.cardNumber = cardNumber;
        this.cardExp = cardExp;
        this.cardBillingAddress = cardBillingAddress;
        this.cardZip = cardZip;
        this.cardCity = cardCity;
        this.cardState = cardState;
        this.cvv = cvv;
        this.firstName = firstName;
        this.lastName = lastName;
        this.saveCard = saveCard;
    }

    // Getters and Setters

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public LocalDate getCardExp() {
        return cardExp;
    }

    public void setCardExp(LocalDate cardExp) {
        this.cardExp = cardExp;
    }

    public String getCardBillingAddress() {
        return cardBillingAddress;
    }

    public void setCardBillingAddress(String cardBillingAddress) {
        this.cardBillingAddress = cardBillingAddress;
    }

    public String getCardZip() {
        return cardZip;
    }

    public void setCardZip(String cardZip) {
        this.cardZip = cardZip;
    }

    public String getCardCity() {
        return cardCity;
    }

    public void setCardCity(String cardCity) {
        this.cardCity = cardCity;
    }

    public String getCardState() {
        return cardState;
    }

    public void setCardState(String cardState) {
        this.cardState = cardState;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvvHash(String cvv) {
        this.cvv = cvv;
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

    public boolean isSaveCard() {
        return saveCard;
    }

    public void setSaveCard(boolean saveCard) {
        this.saveCard = saveCard;
    }
}