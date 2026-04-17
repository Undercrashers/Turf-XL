package com.turfmanagement.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CompleteProfileDto {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 2, max = 60)
    private String name;

    @NotBlank
    @Pattern(regexp = "\\+?[0-9]{10,13}", message = "Invalid phone number")
    private String phone;
}
