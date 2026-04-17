package com.turfmanagement.service.impl;

import com.turfmanagement.entity.OtpVerification;
import com.turfmanagement.enums.OtpPurpose;
import com.turfmanagement.repository.OtpVerificationRepository;
import com.turfmanagement.service.EmailService;
import com.turfmanagement.service.OtpService;
import com.turfmanagement.util.OtpGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpVerificationRepository otpRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final OtpGenerator otpGenerator;

    @Value("${app.otp.expiry-seconds}")
    private long expirySeconds;

    @Value("${app.otp.max-attempts}")
    private int maxAttempts;

    @Override
    @Transactional
    public void generateAndSend(String email, OtpPurpose purpose) {
        String otp = otpGenerator.generate();

        OtpVerification record = OtpVerification.builder()
                .email(email)
                .otpHash(passwordEncoder.encode(otp))
                .purpose(purpose)
                .expiresAt(Instant.now().plusSeconds(expirySeconds))
                .attemptCount(0)
                .consumed(false)
                .build();
        otpRepository.save(record);

        emailService.sendOtpEmail(email, otp);
    }

    @Override
    @Transactional
    public boolean verify(String email, String otp, OtpPurpose purpose) {
        Optional<OtpVerification> latest = otpRepository
                .findTopByEmailAndPurposeAndConsumedFalseOrderByCreatedAtDesc(email, purpose);

        if (latest.isEmpty()) return false;

        OtpVerification record = latest.get();
        if (record.getExpiresAt().isBefore(Instant.now())) return false;
        if (record.getAttemptCount() >= maxAttempts) return false;

        record.setAttemptCount(record.getAttemptCount() + 1);

        if (passwordEncoder.matches(otp, record.getOtpHash())) {
            record.setConsumed(true);
            otpRepository.save(record);
            return true;
        }
        otpRepository.save(record);
        return false;
    }
}
