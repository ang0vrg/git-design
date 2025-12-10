package org.acme.DTO;

import org.acme.Entity.Alert.AlertType;

public record AlertCreateRequest(
        Long buildingId,
        AlertType type,
        String message) {
}
