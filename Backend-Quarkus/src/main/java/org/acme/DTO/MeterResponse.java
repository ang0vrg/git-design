package org.acme.DTO;

import java.time.LocalDateTime;

public record MeterResponse(
        Long id,
        Long buildingId,
        String buildingName,
        String meterCode,
        String model,
        LocalDateTime installationAt) {
}
