package org.acme.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ConsumptionResponse(
        Long id,
        Long meterId,
        String meterCode,
        BigDecimal kwh,
        LocalDateTime readingAt,
        LocalDateTime createdAt) {
}
