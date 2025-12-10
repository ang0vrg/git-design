package org.acme.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
public class Report extends PanacheEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id")
    public Building building;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_type", nullable = false)
    public ReportType reportType;

    @Column(name = "start_date", nullable = false)
    public LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    public LocalDate endDate;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "payload", columnDefinition = "JSON")
    public JsonNode payload;

    @Column(name = "created_at")
    public LocalDateTime createdAt = LocalDateTime.now();

    public enum ReportType {
        DAILY,
        WEEKLY,
        MONTHLY,
        CUSTOM
    }
}
