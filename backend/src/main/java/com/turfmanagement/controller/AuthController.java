package com.turfmanagement.controller;

import com.turfmanagement.dto.request.AdminLoginDto;
import com.turfmanagement.dto.request.CompleteProfileDto;
import com.turfmanagement.dto.request.OtpRequestDto;
import com.turfmanagement.dto.request.OtpVerifyDto;
import com.turfmanagement.dto.response.ApiResponse;
import com.turfmanagement.dto.response.AuthResponseDto;
import com.turfmanagement.dto.response.UserResponseDto;
import com.turfmanagement.entity.User;
import com.turfmanagement.service.AuthService;
import com.turfmanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/request-otp")
    public ApiResponse<Void> requestOtp(@Valid @RequestBody OtpRequestDto dto) {
        authService.requestOtp(dto);
        return ApiResponse.ok("OTP sent", null);
    }

    @PostMapping("/verify-otp")
    public ApiResponse<AuthResponseDto> verifyOtp(@Valid @RequestBody OtpVerifyDto dto) {
        return ApiResponse.ok(authService.verifyOtp(dto));
    }

    @PostMapping("/complete-profile")
    public ApiResponse<AuthResponseDto> completeProfile(@Valid @RequestBody CompleteProfileDto dto) {
        return ApiResponse.ok(authService.completeProfile(dto));
    }

    @PostMapping("/admin-login")
    public ApiResponse<AuthResponseDto> adminLogin(@Valid @RequestBody AdminLoginDto dto) {
        return ApiResponse.ok(authService.adminLogin(dto));
    }

    @GetMapping("/me")
    public ApiResponse<UserResponseDto> me(@AuthenticationPrincipal User user) {
        return ApiResponse.ok(userService.getCurrentUser(user.getId()));
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout() {
        // Stateless JWT – client simply drops the token. Hook for future blacklist.
        return ApiResponse.ok("Logged out", null);
    }
}
