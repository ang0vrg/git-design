package org.acme.DTO;

import java.math.BigDecimal;

public record BuildingCreateRequest(
        String name,
        String address,
        String city,
        String country,
        BigDecimal lat,
        BigDecimal lon) {
}
