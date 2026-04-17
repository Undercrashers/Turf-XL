package com.turfmanagement.service;

import com.turfmanagement.dto.request.BookingCreateDto;
import com.turfmanagement.dto.response.BookingResponseDto;

import java.util.List;

public interface BookingService {
    BookingResponseDto create(Long userId, BookingCreateDto dto);
    List<BookingResponseDto> myBookings(Long userId);
    BookingResponseDto cancel(Long userId, Long bookingId);
}
