package com.turfmanagement.mapper;

import com.turfmanagement.dto.response.UserResponseDto;
import com.turfmanagement.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDto toDto(User user);
}
