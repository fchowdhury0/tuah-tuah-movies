package com.example.demo.dto;

public class EmailRequest {
    private Integer promotionId;
    private String emailSubject;
    private String emailMessage;

    // Constructors
    public EmailRequest() {}

    public EmailRequest(Integer promotionId, String emailSubject, String emailMessage) {
        this.promotionId = promotionId;
        this.emailSubject = emailSubject;
        this.emailMessage = emailMessage;
    }

    // Getters and Setters

    public Integer getPromotionId() { 
        return promotionId; 
    }

    public void setPromotionId(Integer promotionId) { 
        this.promotionId = promotionId; 
    }

    public String getEmailSubject() { 
        return emailSubject; 
    }

    public void setEmailSubject(String emailSubject) { 
        this.emailSubject = emailSubject; 
    }

    public String getEmailMessage() { 
        return emailMessage; 
    }

    public void setEmailMessage(String emailMessage) { 
        this.emailMessage = emailMessage; 
    }

    @Override
    public String toString() {
        return "EmailRequest [emailMessage=" + emailMessage + ", emailSubject=" + emailSubject + ", promotionId="
                + promotionId + "]";
    }
}