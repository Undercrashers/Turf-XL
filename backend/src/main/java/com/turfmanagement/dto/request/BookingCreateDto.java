package com.turfmanagement.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookingCreateDto {

    @NotNull
    private Long turfId;

    @NotBlank
    private String slotLabel;

    @NotBlank
    private String bookingDate;

    @NotNull
    private BigDecimal amount;
}
