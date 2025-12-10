package org.acme.DTO;

import org.acme.Entity.Report.ReportType;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReportResponse(
        Long id,
        Long buildingId,
        String buildingName,
        ReportType reportType,
        LocalDate startDate,
        LocalDate endDate,
        JsonNode payload,
        LocalDateTime createdAt) {
}
