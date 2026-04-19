package com.turfmanagement.service.impl;

import com.turfmanagement.dto.request.BookingCreateDto;
import com.turfmanagement.dto.response.BookingResponseDto;
import com.turfmanagement.entity.Booking;
import com.turfmanagement.entity.Slot;
import com.turfmanagement.entity.Turf;
import com.turfmanagement.entity.User;
import com.turfmanagement.enums.BookingStatus;
import com.turfmanagement.exception.BadRequestException;
import com.turfmanagement.mapper.BookingMapper;
import com.turfmanagement.repository.BookingRepository;
import com.turfmanagement.repository.SlotRepository;
import com.turfmanagement.repository.TurfRepository;
import com.turfmanagement.repository.UserRepository;
import com.turfmanagement.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private static final DateTimeFormatter TIME_12H = DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH);

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;
    private final TurfRepository turfRepository;
    private final UserRepository userRepository;
    private final BookingMapper bookingMapper;

    @Override
    @Transactional
    public BookingResponseDto create(Long userId, BookingCreateDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));

        Turf turf = turfRepository.findById(dto.getTurfId())
                .orElseThrow(() -> new BadRequestException("Turf not found"));

        LocalDate date = LocalDate.parse(dto.getBookingDate());
        LocalTime startTime = LocalTime.parse(dto.getSlotLabel().trim().toUpperCase(Locale.ENGLISH), TIME_12H);
        LocalDateTime start = LocalDateTime.of(date, startTime);
        LocalDateTime end = start.plusHours(1);

        if (bookingRepository.existsByTurfIdAndSlot_StartTimeAndStatus(
                turf.getId(), start, BookingStatus.CONFIRMED)) {
            throw new BadRequestException("This slot is already booked. Please pick another time.");
        }

        Slot slot = slotRepository.save(Slot.builder()
                .turf(turf)
                .startTime(start)
                .endTime(end)
                .available(false)
                .build());

        Booking booking = bookingRepository.save(Booking.builder()
                .user(user)
                .turf(turf)
                .slot(slot)
                .totalAmount(dto.getAmount())
                .sport(dto.getSport())
                .status(BookingStatus.CONFIRMED)
                .build());

        return bookingMapper.toDto(booking);
    }

    @Override
    public List<BookingResponseDto> myBookings(Long userId) {
        return bookingRepository.findAllByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(bookingMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public BookingResponseDto cancel(Long userId, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BadRequestException("Booking not found"));
        if (!booking.getUser().getId().equals(userId)) {
            throw new BadRequestException("Not your booking");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        if (booking.getSlot() != null) {
            booking.getSlot().setAvailable(true);
        }
        return bookingMapper.toDto(booking);
    }
}
