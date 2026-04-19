package com.turfmanagement.config;

import com.turfmanagement.entity.Turf;
import com.turfmanagement.repository.TurfRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final TurfRepository turfRepository;

    @Override
    public void run(String... args) {
        if (turfRepository.count() > 0) return;

        List<Turf> seeds = List.of(
                Turf.builder()
                        .name("Salt Lake Arena")
                        .description("5v5 FIFA-certified 4G turf in Sector V.")
                        .address("Sector V, Salt Lake, Kolkata")
                        .city("Kolkata")
                        .pricePerHour(new BigDecimal("1200"))
                        .coverImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuAMNUMOvFYITmVisHHSN8X6PODyo8Zgi0lO61EKDvF8ZxZLcsIy7xzIxm4_qfzLfPKNWMBri2iLAD2wPiUPTrOSK9xu4on9PbgipXqh0Wk5bon6PjIMQKgy0agyOZgD0KlGs_QXHV62ECV0AL_-eP4j7VRARGXHLfyqDZJ2W26QKBI2kNZE9rB2DFiIE5_x8sn0_PhlMHJ8s5z1jQxKsLzcBgkrYlgYbPGG9oYdML0HGRwI0bTLiOrcOtt1eVR3DBI_vmv1kRL8BB7q")
                        .active(true)
                        .build(),
                Turf.builder()
                        .name("Elite Sports Hub")
                        .description("7v7 flagship venue with dressing rooms, AC rest area and cafe.")
                        .address("Action Area II, New Town, Kolkata")
                        .city("Kolkata")
                        .pricePerHour(new BigDecimal("1500"))
                        .coverImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuCVXR-3XpIMZHKJUcaosiFf3GhsEoJRrsBr5x2SU0dqlsCZ9GohtYV9aYOEBRXWASmCn7bHby-oWJsB-1QOraiDLs5vzBVZhL3rs-g8RE-d-fZdPN0VwOto0HZeUqX83lZmljfRi43S6uofEMzSdkbGMGbdRZevULxd-F3rZOklTkqBFNc6t85x6gxVBc2MIFy-AGOp34XmWypbV8ypw-kYbsEOz9UBAKNm34NtRrlcREsYw7yh7Tqd9eiCCOs4HneLufdhd7j-xQvA")
                        .active(true)
                        .build(),
                Turf.builder()
                        .name("Park Circus Pitch")
                        .description("Compact community box arena behind 7 Point.")
                        .address("7 Point Crossing, Park Circus, Kolkata")
                        .city("Kolkata")
                        .pricePerHour(new BigDecimal("1000"))
                        .coverImageUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuDHKlcuZwVXzONiXuEI2lVkP69aw30Orz3KGxmU_KLSDcqz91LiblkyrfTAFATLWObXCenj1Tz-2ienlWCzW-MdcMgG-x1eiiBNozYEdTiuaJjt2BO9tQkEn9qPO1jPd72JR6-tCenfcXBiGhjsHanySobDbtnELR37QUSDtblYxbEVnTaX56PO6PY62EHcCrK27QfZkdVKDoUAOSsJ0D1Wari2oTSHThTIPcerqS8mkC6EtlyS17nDiBhx_RlQTCB0AMWqWZKeB0gY")
                        .active(true)
                        .build()
        );

        turfRepository.saveAll(seeds);
        log.info("[DEV] Seeded {} turfs", seeds.size());
    }
}
