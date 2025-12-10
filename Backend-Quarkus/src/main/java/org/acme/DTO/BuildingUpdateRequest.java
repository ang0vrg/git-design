package org.acme.DTO;

import java.math.BigDecimal;

public record BuildingUpdateRequest(
        String name,
        String address,
        String city,
        String country,
        BigDecimal lat,
        BigDecimal lon) {
}
