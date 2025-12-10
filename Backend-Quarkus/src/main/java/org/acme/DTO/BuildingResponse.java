package org.acme.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BuildingResponse(
        Long id,
        String name,
        String address,
        String city,
        String country,
        BigDecimal lat,
        BigDecimal lon,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
