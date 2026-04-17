package com.turfmanagement.mapper;

import com.turfmanagement.dto.response.TurfResponseDto;
import com.turfmanagement.entity.Turf;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TurfMapper {
    TurfResponseDto toDto(Turf turf);
}
