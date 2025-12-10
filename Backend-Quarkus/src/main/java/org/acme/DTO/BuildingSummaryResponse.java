package org.acme.DTO;

public record BuildingSummaryResponse(
        Long id,
        String name,
        String city) {
}
