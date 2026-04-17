package com.turfmanagement.controller;

import com.turfmanagement.dto.request.BookingCreateDto;
import com.turfmanagement.dto.response.ApiResponse;
import com.turfmanagement.dto.response.BookingResponseDto;
import com.turfmanagement.entity.User;
import com.turfmanagement.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ApiResponse<BookingResponseDto> create(@AuthenticationPrincipal User user,
                                                  @Valid @RequestBody BookingCreateDto dto) {
        return ApiResponse.ok(bookingService.create(user.getId(), dto));
    }

    @GetMapping("/me")
    public ApiResponse<List<BookingResponseDto>> mine(@AuthenticationPrincipal User user) {
        return ApiResponse.ok(bookingService.myBookings(user.getId()));
    }

    @PostMapping("/{id}/cancel")
    public ApiResponse<BookingResponseDto> cancel(@AuthenticationPrincipal User user,
                                                  @PathVariable Long id) {
        return ApiResponse.ok(bookingService.cancel(user.getId(), id));
    }
}
