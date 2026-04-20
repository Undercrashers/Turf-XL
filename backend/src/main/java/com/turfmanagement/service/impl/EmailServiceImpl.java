package com.turfmanagement.service.impl;

import com.turfmanagement.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String to, String otp) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject("Your Turf XL login OTP");
            msg.setText("Your OTP is: " + otp + "\nIt is valid for 5 minutes.");
            mailSender.send(msg);
        } catch (Exception e) {
            // In dev, just log the OTP so you can copy/paste without SMTP set up.
            log.warn("[DEV] Email send failed. OTP for {} = {}", to, otp);
        }
    }

    @Override
    public void sendBookingConfirmation(String to, String bookingDetails) {
        // TODO: implement later
        log.info("Booking confirmation would be sent to {}: {}", to, bookingDetails);
    }

    @Override
    public void sendBookingCancellation(String to, String bookingDetails) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject("Your Turf XL booking was cancelled");
            msg.setText(
                    "Hi,\n\n"
                            + "Your Turf XL booking has been cancelled by the venue admin.\n\n"
                            + "Booking details:\n" + bookingDetails + "\n\n"
                            + "The slot is now available again — you're welcome to rebook this or another time from your dashboard.\n\n"
                            + "— Turf XL Team"
            );
            mailSender.send(msg);
        } catch (Exception e) {
            log.warn("[DEV] Cancellation email send failed for {}: {}", to, bookingDetails);
        }
    }
}
