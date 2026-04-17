package com.turfmanagement.controller;

import com.turfmanagement.dto.response.ApiResponse;
import com.turfmanagement.dto.response.UserResponseDto;
import com.turfmanagement.entity.User;
import com.turfmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<UserResponseDto> me(@AuthenticationPrincipal User user) {
        return ApiResponse.ok(userService.getCurrentUser(user.getId()));
    }
}
