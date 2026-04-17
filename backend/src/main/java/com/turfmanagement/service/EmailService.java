package com.turfmanagement.service;

public interface EmailService {
    void sendOtpEmail(String to, String otp);
    void sendBookingConfirmation(String to, String bookingDetails);
}
