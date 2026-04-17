package com.turfmanagement.service;

import com.turfmanagement.dto.response.UserResponseDto;
import com.turfmanagement.entity.User;

public interface UserService {

    User getByEmail(String email);

    UserResponseDto getCurrentUser(Long userId);
}
