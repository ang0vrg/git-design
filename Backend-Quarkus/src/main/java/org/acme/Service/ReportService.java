package org.acme.Service;

import org.acme.DTO.*;
import org.acme.Entity.Report;
import org.acme.Entity.Report.ReportType;
import org.acme.Entity.Building;
import org.acme.Repository.ReportRepository;
import org.acme.Repository.BuildingRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ReportService {

    @Inject
    ReportRepository reportRepo;

    @Inject
    BuildingRepository buildingRepo;

    @Inject
    ObjectMapper objectMapper;

    @Transactional
    public ReportResponse create(ReportCreateRequest req) {
        Building building = null;
        if (req.buildingId() != null) {
            building = buildingRepo.findByIdOptional(req.buildingId())
                    .orElseThrow(() -> new IllegalArgumentException("Building not found"));
        }

        Report report = new Report();
        report.building = building;
        report.reportType = req.reportType();
        report.startDate = req.startDate();
        report.endDate = req.endDate();
        report.payload = req.payload();

        reportRepo.persist(report);
        return toResponse(report);
    }

    @Transactional
    public ReportResponse generateDailyReport(Long buildingId, LocalDate date) {
        ObjectNode payload = objectMapper.createObjectNode();
        payload.put("type", "daily");
        payload.put("date", date.toString());
        // Add more report data here based on consumptions, etc.

        ReportCreateRequest req = new ReportCreateRequest(
                buildingId,
                ReportType.DAILY,
                date,
                date,
                payload);
        return create(req);
    }

    @Transactional
    public ReportResponse generateWeeklyReport(Long buildingId, LocalDate weekStart) {
        LocalDate weekEnd = weekStart.plusDays(6);
        ObjectNode payload = objectMapper.createObjectNode();
        payload.put("type", "weekly");
        payload.put("weekStart", weekStart.toString());
        payload.put("weekEnd", weekEnd.toString());

        ReportCreateRequest req = new ReportCreateRequest(
                buildingId,
                ReportType.WEEKLY,
                weekStart,
                weekEnd,
                payload);
        return create(req);
    }

    @Transactional
    public ReportResponse generateMonthlyReport(Long buildingId, YearMonth month) {
        LocalDate startDate = month.atDay(1);
        LocalDate endDate = month.atEndOfMonth();
        ObjectNode payload = objectMapper.createObjectNode();
        payload.put("type", "monthly");
        payload.put("month", month.toString());

        ReportCreateRequest req = new ReportCreateRequest(
                buildingId,
                ReportType.MONTHLY,
                startDate,
                endDate,
                payload);
        return create(req);
    }

    @Transactional
    public ReportResponse generateCustomReport(Long buildingId, LocalDate start, LocalDate end) {
        ObjectNode payload = objectMapper.createObjectNode();
        payload.put("type", "custom");
        payload.put("startDate", start.toString());
        payload.put("endDate", end.toString());

        ReportCreateRequest req = new ReportCreateRequest(
                buildingId,
                ReportType.CUSTOM,
                start,
                end,
                payload);
        return create(req);
    }

    @Transactional
    public void delete(Long id) {
        reportRepo.deleteById(id);
    }

    public ReportResponse findById(Long id) {
        return reportRepo.findByIdOptional(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));
    }

    public List<ReportResponse> listByBuilding(Long buildingId) {
        return reportRepo.findByBuildingId(buildingId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ReportSummaryResponse> listByBuildingSummary(Long buildingId) {
        return reportRepo.findByBuildingId(buildingId).stream()
                .map(this::toSummary)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> listByType(ReportType type) {
        return reportRepo.findByReportType(type).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Helper methods
    private ReportResponse toResponse(Report r) {
        return new ReportResponse(
                r.id,
                r.building != null ? r.building.id : null,
                r.building != null ? r.building.name : null,
                r.reportType,
                r.startDate,
                r.endDate,
                r.payload,
                r.createdAt);
    }

    private ReportSummaryResponse toSummary(Report r) {
        return new ReportSummaryResponse(
                r.id,
                r.reportType,
                r.startDate,
                r.endDate,
                r.createdAt);
    }
}
