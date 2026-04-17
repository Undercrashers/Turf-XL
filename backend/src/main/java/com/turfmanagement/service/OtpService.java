package com.turfmanagement.service;

import com.turfmanagement.enums.OtpPurpose;

public interface OtpService {

    /** Generates a new OTP, persists its hash, and emails it. */
    void generateAndSend(String email, OtpPurpose purpose);

    /** Returns true if OTP is valid & not expired; consumes it on success. */
    boolean verify(String email, String otp, OtpPurpose purpose);
}
