package com.turfmanagement.controller;

import com.turfmanagement.dto.response.AdminBookingDto;
import com.turfmanagement.dto.response.ApiResponse;
import com.turfmanagement.entity.Booking;
import com.turfmanagement.entity.User;
import com.turfmanagement.enums.Role;
import com.turfmanagement.exception.BadRequestException;
import com.turfmanagement.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final BookingRepository bookingRepository;

    @GetMapping("/bookings")
    @Transactional(readOnly = true)
    public ApiResponse<List<AdminBookingDto>> listBookings(@AuthenticationPrincipal User admin) {
        List<Booking> bookings;
        if (admin.getRole() == Role.SUPER_ADMIN) {
            bookings = bookingRepository.findAllByOrderByCreatedAtDesc();
        } else if (admin.getRole() == Role.ADMIN) {
            if (admin.getManagedTurfId() == null) {
                throw new BadRequestException("Admin is not assigned to any turf");
            }
            bookings = bookingRepository.findAllByTurfIdOrderByCreatedAtDesc(admin.getManagedTurfId());
        } else {
            throw new BadRequestException("Not authorized");
        }

        List<AdminBookingDto> dtos = bookings.stream().map(b -> AdminBookingDto.builder()
                .id(b.getId())
                .turfId(b.getTurf() != null ? b.getTurf().getId() : null)
                .turfName(b.getTurf() != null ? b.getTurf().getName() : null)
                .turfAddress(b.getTurf() != null ? b.getTurf().getAddress() : null)
                .startTime(b.getSlot() != null ? b.getSlot().getStartTime() : null)
                .endTime(b.getSlot() != null ? b.getSlot().getEndTime() : null)
                .sport(b.getSport())
                .totalAmount(b.getTotalAmount())
                .status(b.getStatus())
                .createdAt(b.getCreatedAt())
                .userId(b.getUser() != null ? b.getUser().getId() : null)
                .userName(b.getUser() != null ? b.getUser().getName() : null)
                .userEmail(b.getUser() != null ? b.getUser().getEmail() : null)
                .userPhone(b.getUser() != null ? b.getUser().getPhone() : null)
                .build()
        ).toList();

        return ApiResponse.ok(dtos);
    }
}
