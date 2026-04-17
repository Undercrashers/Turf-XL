package com.turfmanagement.mapper;

import com.turfmanagement.dto.response.SlotResponseDto;
import com.turfmanagement.entity.Slot;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SlotMapper {

    @Mapping(source = "turf.id", target = "turfId")
    SlotResponseDto toDto(Slot slot);
}
