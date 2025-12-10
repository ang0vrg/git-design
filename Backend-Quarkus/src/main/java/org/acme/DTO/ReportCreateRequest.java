package org.acme.DTO;

import org.acme.Entity.Report.ReportType;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.LocalDate;

public record ReportCreateRequest(
        Long buildingId,
        ReportType reportType,
        LocalDate startDate,
        LocalDate endDate,
        JsonNode payload) {
}
