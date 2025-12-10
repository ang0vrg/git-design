package org.acme.Service;

import org.acme.DTO.*;
import org.acme.Entity.Building;
import org.acme.Repository.BuildingRepository;
import org.acme.Repository.AlertRepository;
import org.acme.Repository.MeterRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class BuildingService {

    @Inject
    BuildingRepository buildingRepo;

    @Inject
    MeterRepository meterRepo;

    @Inject
    AlertRepository alertRepo;

    @Transactional
    public BuildingResponse create(BuildingCreateRequest req) {
        Building building = new Building();
        building.name = req.name();
        building.address = req.address();
        building.city = req.city();
        building.country = req.country() != null ? req.country() : "PE";
        building.lat = req.lat();
        building.lon = req.lon();

        buildingRepo.persist(building);
        return toResponse(building);
    }

    @Transactional
    public BuildingResponse update(Long id, BuildingUpdateRequest req) {
        Building building = buildingRepo.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Building not found"));

        if (req.name() != null)
            building.name = req.name();
        if (req.address() != null)
            building.address = req.address();
        if (req.city() != null)
            building.city = req.city();
        if (req.country() != null)
            building.country = req.country();
        if (req.lat() != null)
            building.lat = req.lat();
        if (req.lon() != null)
            building.lon = req.lon();

        return toResponse(building);
    }

    @Transactional
    public void delete(Long id) {
        buildingRepo.deleteById(id);
    }

    public BuildingResponse findById(Long id) {
        return buildingRepo.findByIdOptional(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Building not found"));
    }

    public List<BuildingResponse> listAll() {
        return buildingRepo.listAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<BuildingSummaryResponse> listAllSummary() {
        return buildingRepo.listAll().stream()
                .map(this::toSummary)
                .collect(Collectors.toList());
    }

    public List<BuildingResponse> searchByName(String name) {
        return buildingRepo.searchByName(name).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<BuildingResponse> findByCity(String city) {
        return buildingRepo.findByCity(city).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<BuildingResponse> getBuildingsWithActiveAlerts() {
        return alertRepo.findUnreadAlerts().stream()
                .map(alert -> alert.building)
                .distinct()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Helper methods
    private BuildingResponse toResponse(Building b) {
        return new BuildingResponse(
                b.id,
                b.name,
                b.address,
                b.city,
                b.country,
                b.lat,
                b.lon,
                b.createdAt,
                b.updatedAt);
    }

    private BuildingSummaryResponse toSummary(Building b) {
        return new BuildingSummaryResponse(b.id, b.name, b.city);
    }
}
