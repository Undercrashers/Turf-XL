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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Slf4j
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

        if (user.getName() == null || user.getName().isBlank()
                || user.getPhone() == null || user.getPhone().isBlank()) {
            throw new BadRequestException("Please add your name and phone number before booking.");
        }

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

        log.info("[BOOKING] Created booking id={} for userId={} turfId={} slot={}",
                booking.getId(), user.getId(), turf.getId(), start);
        return bookingMapper.toDto(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponseDto> myBookings(Long userId) {
        List<Booking> all = bookingRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        log.info("[BOOKING] myBookings(userId={}) → {} rows", userId, all.size());
        return all.stream()
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
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            return bookingMapper.toDto(booking);
        }
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        Slot slot = booking.getSlot();
        if (slot != null) {
            slot.setAvailable(true);
            slotRepository.save(slot);
        }
        return bookingMapper.toDto(booking);
    }
}
