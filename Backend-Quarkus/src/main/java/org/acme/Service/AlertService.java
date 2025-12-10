package org.acme.Service;

import org.acme.DTO.*;
import org.acme.Entity.Alert;
import org.acme.Entity.Alert.AlertType;
import org.acme.Entity.Building;
import org.acme.Repository.AlertRepository;
import org.acme.Repository.BuildingRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class AlertService {

    @Inject
    AlertRepository alertRepo;

    @Inject
    BuildingRepository buildingRepo;

    @Transactional
    public AlertResponse create(AlertCreateRequest req) {
        Building building = buildingRepo.findByIdOptional(req.buildingId())
                .orElseThrow(() -> new IllegalArgumentException("Building not found"));

        Alert alert = new Alert();
        alert.building = building;
        alert.type = req.type();
        alert.message = req.message();

        alertRepo.persist(alert);
        return toResponse(alert);
    }

    @Transactional
    public AlertResponse createHighConsumptionAlert(Long buildingId, String message) {
        return create(new AlertCreateRequest(buildingId, AlertType.HIGH_CONSUMPTION, message));
    }

    @Transactional
    public AlertResponse markAsRead(Long id) {
        Alert alert = alertRepo.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Alert not found"));
        alert.isRead = true;
        return toResponse(alert);
    }

    @Transactional
    public void markAllAsRead(Long buildingId) {
        List<Alert> alerts = alertRepo.findByBuildingIdAndUnread(buildingId);
        alerts.forEach(alert -> alert.isRead = true);
    }

    @Transactional
    public void delete(Long id) {
        alertRepo.deleteById(id);
    }

    public AlertResponse findById(Long id) {
        return alertRepo.findByIdOptional(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Alert not found"));
    }

    public List<AlertResponse> listByBuilding(Long buildingId) {
        return alertRepo.findByBuildingId(buildingId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AlertResponse> listUnread() {
        return alertRepo.findUnreadAlerts().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AlertResponse> listUnreadByBuilding(Long buildingId) {
        return alertRepo.findByBuildingIdAndUnread(buildingId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public long getUnreadCount(Long buildingId) {
        return alertRepo.countUnreadByBuildingId(buildingId);
    }

    // Helper method
    private AlertResponse toResponse(Alert a) {
        return new AlertResponse(
                a.id,
                a.building.id,
                a.building.name,
                a.type,
                a.message,
                a.isRead,
                a.createdAt);
    }
}
