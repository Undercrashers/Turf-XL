package com.turfmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sport_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SportType extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String iconUrl;
}
