package com.turfmanagement.service.impl;

import com.turfmanagement.dto.response.TurfResponseDto;
import com.turfmanagement.exception.ResourceNotFoundException;
import com.turfmanagement.mapper.TurfMapper;
import com.turfmanagement.repository.TurfRepository;
import com.turfmanagement.service.TurfService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TurfServiceImpl implements TurfService {

    private final TurfRepository turfRepository;
    private final TurfMapper turfMapper;

    @Override
    public List<TurfResponseDto> listAll() {
        return turfRepository.findAllByActiveTrue().stream()
                .map(turfMapper::toDto)
                .toList();
    }

    @Override
    public TurfResponseDto getById(Long id) {
        return turfRepository.findById(id)
                .map(turfMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Turf not found: " + id));
    }
}
