package com.turfmanagement.service;

import com.turfmanagement.dto.request.CompleteProfileDto;
import com.turfmanagement.dto.request.OtpRequestDto;
import com.turfmanagement.dto.request.OtpVerifyDto;
import com.turfmanagement.dto.response.AuthResponseDto;

public interface AuthService {

    void requestOtp(OtpRequestDto dto);

    AuthResponseDto verifyOtp(OtpVerifyDto dto);

    AuthResponseDto completeProfile(CompleteProfileDto dto);
}
