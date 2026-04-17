package com.turfmanagement.controller;

import com.turfmanagement.dto.response.ApiResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @GetMapping("/dashboard")
    public ApiResponse<Map<String, Object>> dashboard() {
        // TODO: real metrics (total bookings, revenue, active slots, etc.)
        return ApiResponse.ok(Map.of(
                "totalBookings", 0,
                "totalRevenue", 0,
                "activeTurfs", 0,
                "activeUsers", 0
        ));
    }
}
