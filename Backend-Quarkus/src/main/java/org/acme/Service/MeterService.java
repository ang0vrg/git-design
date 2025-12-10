package org.acme.Service;

import org.acme.DTO.*;
import org.acme.Entity.Meter;
import org.acme.Entity.Building;
import org.acme.Repository.MeterRepository;
import org.acme.Repository.BuildingRepository;
import org.acme.Repository.ConsumptionRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class MeterService {

    @Inject
    MeterRepository meterRepo;

    @Inject
    BuildingRepository buildingRepo;

    @Inject
    ConsumptionRepository consumptionRepo;

    @Transactional
    public MeterResponse create(MeterCreateRequest req) {
        if (meterRepo.existsByMeterCode(req.meterCode())) {
            throw new IllegalArgumentException("Meter code already exists");
        }

        Building building = buildingRepo.findByIdOptional(req.buildingId())
                .orElseThrow(() -> new IllegalArgumentException("Building not found"));

        Meter meter = new Meter();
        meter.building = building;
        meter.meterCode = req.meterCode();
        meter.model = req.model();

        meterRepo.persist(meter);
        return toResponse(meter);
    }

    @Transactional
    public void delete(Long id) {
        meterRepo.deleteById(id);
    }

    public MeterResponse findById(Long id) {
        return meterRepo.findByIdOptional(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Meter not found"));
    }

    public MeterResponse findByMeterCode(String meterCode) {
        return meterRepo.findByMeterCode(meterCode)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Meter not found"));
    }

    public List<MeterResponse> listByBuilding(Long buildingId) {
        return meterRepo.findByBuildingId(buildingId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public boolean validateMeterCode(String code) {
        return !meterRepo.existsByMeterCode(code);
    }

    // Helper method
    private MeterResponse toResponse(Meter m) {
        return new MeterResponse(
                m.id,
                m.building.id,
                m.building.name,
                m.meterCode,
                m.model,
                m.installationAt);
    }
}
