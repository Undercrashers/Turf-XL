package com.turfmanagement.dto.response;

import com.turfmanagement.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminBookingDto {
    private Long id;
    private Long turfId;
    private String turfName;
    private String turfAddress;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String sport;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private Instant createdAt;

    private Long userId;
    private String userName;
    private String userEmail;
    private String userPhone;
}
