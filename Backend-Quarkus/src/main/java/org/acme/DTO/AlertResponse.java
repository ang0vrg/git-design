package org.acme.DTO;

import org.acme.Entity.Alert.AlertType;
import java.time.LocalDateTime;

public record AlertResponse(
        Long id,
        Long buildingId,
        String buildingName,
        AlertType type,
        String message,
        Boolean isRead,
        LocalDateTime createdAt) {
}
