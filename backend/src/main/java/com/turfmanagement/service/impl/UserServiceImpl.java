package com.turfmanagement.service.impl;

import com.turfmanagement.dto.response.UserResponseDto;
import com.turfmanagement.entity.User;
import com.turfmanagement.exception.ResourceNotFoundException;
import com.turfmanagement.mapper.UserMapper;
import com.turfmanagement.repository.UserRepository;
import com.turfmanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    @Override
    public UserResponseDto getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toDto(user);
    }
}
