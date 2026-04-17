package com.turfmanagement.service;

import com.turfmanagement.dto.response.TurfResponseDto;

import java.util.List;

public interface TurfService {
    List<TurfResponseDto> listAll();
    TurfResponseDto getById(Long id);
}
