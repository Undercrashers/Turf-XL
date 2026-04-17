package com.turfmanagement.service;

import com.turfmanagement.dto.response.SlotResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface SlotService {
    List<SlotResponseDto> listByTurfAndDate(Long turfId, LocalDate date);
}
