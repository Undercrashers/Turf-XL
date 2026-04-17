package com.turfmanagement.dto.response;

import com.turfmanagement.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDto {
    private Long id;
    private Long turfId;
    private String turfName;
    private Long slotId;
    private BigDecimal totalAmount;
    private BookingStatus status;
}
