package com.turfmanagement.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingCreateDto {

    @NotNull
    private Long turfId;

    @NotNull
    private Long slotId;
}
