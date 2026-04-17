package com.turfmanagement.controller;

import com.turfmanagement.dto.response.ApiResponse;
import com.turfmanagement.dto.response.SlotResponseDto;
import com.turfmanagement.service.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/turfs/{turfId}/slots")
@RequiredArgsConstructor
public class SlotController {

    private final SlotService slotService;

    @GetMapping
    public ApiResponse<List<SlotResponseDto>> list(
            @PathVariable Long turfId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ApiResponse.ok(slotService.listByTurfAndDate(turfId, date));
    }
}
