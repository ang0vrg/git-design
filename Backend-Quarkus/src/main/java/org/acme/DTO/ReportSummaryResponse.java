package org.acme.DTO;

import org.acme.Entity.Report.ReportType;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReportSummaryResponse(
        Long id,
        ReportType reportType,
        LocalDate startDate,
        LocalDate endDate,
        LocalDateTime createdAt) {
}
