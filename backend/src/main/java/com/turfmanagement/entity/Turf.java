package com.turfmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "turfs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Turf extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private String address;
    private String city;

    private Double latitude;
    private Double longitude;

    @Column(precision = 10, scale = 2)
    private BigDecimal pricePerHour;

    private String coverImageUrl;

    @Column(nullable = false)
    private boolean active = true;
}
