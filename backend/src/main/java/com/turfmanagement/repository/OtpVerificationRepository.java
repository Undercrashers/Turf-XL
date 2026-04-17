package com.turfmanagement.repository;

import com.turfmanagement.entity.OtpVerification;
import com.turfmanagement.enums.OtpPurpose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByEmailAndPurposeAndConsumedFalseOrderByCreatedAtDesc(
            String email, OtpPurpose purpose);
}
