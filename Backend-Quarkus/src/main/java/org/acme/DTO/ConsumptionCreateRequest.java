package org.acme.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ConsumptionCreateRequest(
        Long meterId,
        BigDecimal kwh,
        LocalDateTime readingAt) {
}
