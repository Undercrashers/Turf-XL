package com.turfmanagement.service.impl;

import com.turfmanagement.dto.request.BookingCreateDto;
import com.turfmanagement.dto.response.BookingResponseDto;
import com.turfmanagement.mapper.BookingMapper;
import com.turfmanagement.repository.BookingRepository;
import com.turfmanagement.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;

    @Override
    public BookingResponseDto create(Long userId, BookingCreateDto dto) {
        // TODO: validate slot availability, compute amount, persist booking & payment
        throw new UnsupportedOperationException("Not implemented in MVP skeleton");
    }

    @Override
    public List<BookingResponseDto> myBookings(Long userId) {
        return bookingRepository.findAllByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(bookingMapper::toDto)
                .toList();
    }

    @Override
    public BookingResponseDto cancel(Long userId, Long bookingId) {
        // TODO: implement cancellation rules
        throw new UnsupportedOperationException("Not implemented in MVP skeleton");
    }
}
