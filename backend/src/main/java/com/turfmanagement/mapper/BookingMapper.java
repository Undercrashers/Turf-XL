package com.turfmanagement.mapper;

import com.turfmanagement.dto.response.BookingResponseDto;
import com.turfmanagement.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    @Mapping(source = "turf.id", target = "turfId")
    @Mapping(source = "turf.name", target = "turfName")
    @Mapping(source = "turf.address", target = "turfAddress")
    @Mapping(source = "turf.coverImageUrl", target = "turfImageUrl")
    @Mapping(source = "slot.id", target = "slotId")
    @Mapping(source = "slot.startTime", target = "startTime")
    @Mapping(source = "slot.endTime", target = "endTime")
    BookingResponseDto toDto(Booking booking);
}
