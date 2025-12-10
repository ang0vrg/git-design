package org.acme.DTO;

public record MeterCreateRequest(
        Long buildingId,
        String meterCode,
        String model) {
}
