package org.acme.DTO;

public record MeterSummaryResponse(
        Long id,
        String meterCode,
        String buildingName) {
}
