package com.turfmanagement.service.impl;

import com.turfmanagement.dto.request.AdminLoginDto;
import com.turfmanagement.dto.request.CompleteProfileDto;
import com.turfmanagement.dto.request.OtpRequestDto;
import com.turfmanagement.dto.request.OtpVerifyDto;
import com.turfmanagement.dto.response.AuthResponseDto;
import com.turfmanagement.dto.response.UserResponseDto;
import com.turfmanagement.entity.User;
import com.turfmanagement.enums.OtpPurpose;
import com.turfmanagement.enums.Role;
import com.turfmanagement.exception.BadRequestException;
import com.turfmanagement.mapper.UserMapper;
import com.turfmanagement.repository.UserRepository;
import com.turfmanagement.security.JwtService;
import com.turfmanagement.service.AuthService;
import com.turfmanagement.service.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void requestOtp(OtpRequestDto dto) {
        otpService.generateAndSend(dto.getEmail(), OtpPurpose.LOGIN);
    }

    @Override
    @Transactional
    public AuthResponseDto verifyOtp(OtpVerifyDto dto) {
        if (!otpService.verify(dto.getEmail(), dto.getOtp(), OtpPurpose.LOGIN)) {
            throw new BadRequestException("Invalid or expired OTP");
        }

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseGet(() -> userRepository.save(User.builder()
                        .email(dto.getEmail())
                        .role(Role.USER)
                        .profileCompleted(false)
                        .active(true)
                        .build()));

        boolean isNewUser = !user.isProfileCompleted();
        String token = jwtService.generateToken(user);

        return AuthResponseDto.builder()
                .token(token)
                .isNewUser(isNewUser)
                .user(toUserDto(user))
                .build();
    }

    @Override
    @Transactional
    public AuthResponseDto completeProfile(CompleteProfileDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found. Verify OTP first."));

        if (user.isProfileCompleted()) {
            throw new BadRequestException("Profile is already completed");
        }
        if (userRepository.existsByPhone(dto.getPhone())) {
            throw new BadRequestException("Phone number already in use");
        }

        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setProfileCompleted(true);
        userRepository.save(user);

        return AuthResponseDto.builder()
                .token(jwtService.generateToken(user))
                .isNewUser(false)
                .user(toUserDto(user))
                .build();
    }

    @Override
    public AuthResponseDto adminLogin(AdminLoginDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        if (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN) {
            throw new BadRequestException("Not an admin account");
        }
        if (user.getPasswordHash() == null
                || !passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid credentials");
        }

        return AuthResponseDto.builder()
                .token(jwtService.generateToken(user))
                .isNewUser(false)
                .user(toUserDto(user))
                .build();
    }

    private UserResponseDto toUserDto(User user) {
        return userMapper.toDto(user);
    }
}
