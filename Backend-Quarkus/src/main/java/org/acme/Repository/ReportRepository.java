package org.acme.Repository;

import org.acme.Entity.Report;
import org.acme.Entity.Report.ReportType;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class ReportRepository implements PanacheRepository<Report> {

    public List<Report> findByBuildingId(Long buildingId) {
        return list("building.id ORDER BY createdAt DESC", buildingId);
    }

    public List<Report> findByReportType(ReportType type) {
        return list("reportType ORDER BY createdAt DESC", type);
    }

    public List<Report> findByDateRange(LocalDate start, LocalDate end) {
        return list("startDate >= ?1 AND endDate <= ?2 ORDER BY createdAt DESC", start, end);
    }
}
