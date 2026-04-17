package com.turfmanagement.service.impl;

import com.turfmanagement.dto.response.SlotResponseDto;
import com.turfmanagement.mapper.SlotMapper;
import com.turfmanagement.repository.SlotRepository;
import com.turfmanagement.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotServiceImpl implements SlotService {

    private final SlotRepository slotRepository;
    private final SlotMapper slotMapper;

    @Override
    public List<SlotResponseDto> listByTurfAndDate(Long turfId, LocalDate date) {
        LocalDate target = (date != null) ? date : LocalDate.now();
        return slotRepository
                .findAllByTurfIdAndStartTimeBetween(
                        turfId,
                        target.atStartOfDay(),
                        target.atTime(LocalTime.MAX))
                .stream()
                .map(slotMapper::toDto)
                .toList();
    }
}
