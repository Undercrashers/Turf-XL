package com.turfmanagement.controller;

import com.turfmanagement.dto.response.ApiResponse;
import com.turfmanagement.dto.response.TurfResponseDto;
import com.turfmanagement.service.TurfService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turfs")
@RequiredArgsConstructor
public class TurfController {

    private final TurfService turfService;

    @GetMapping
    public ApiResponse<List<TurfResponseDto>> list() {
        return ApiResponse.ok(turfService.listAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<TurfResponseDto> getById(@PathVariable Long id) {
        return ApiResponse.ok(turfService.getById(id));
    }
}
