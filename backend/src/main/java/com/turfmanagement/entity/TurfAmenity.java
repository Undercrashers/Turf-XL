package com.turfmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "turf_amenities",
       uniqueConstraints = @UniqueConstraint(columnNames = {"turf_id", "amenity_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TurfAmenity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "turf_id")
    private Turf turf;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "amenity_id")
    private Amenity amenity;
}
