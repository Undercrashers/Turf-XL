package com.turfmanagement.repository;

import com.turfmanagement.entity.Booking;
import com.turfmanagement.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    List<Booking> findAllByTurfIdOrderByCreatedAtDesc(Long turfId);

    List<Booking> findAllByOrderByCreatedAtDesc();

    boolean existsByTurfIdAndSlot_StartTimeAndStatus(Long turfId, LocalDateTime startTime, BookingStatus status);
}
