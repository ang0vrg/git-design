package org.acme.Service;

import org.acme.DTO.*;
import org.acme.Entity.Consumption;
import org.acme.Entity.Meter;
import org.acme.Repository.ConsumptionRepository;
import org.acme.Repository.MeterRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ConsumptionService {

    @Inject
    ConsumptionRepository consumptionRepo;

    @Inject
    MeterRepository meterRepo;

    @Transactional
    public ConsumptionResponse create(ConsumptionCreateRequest req) {
        Meter meter = meterRepo.findByIdOptional(req.meterId())
                .orElseThrow(() -> new IllegalArgumentException("Meter not found"));

        Consumption consumption = new Consumption();
        consumption.meter = meter;
        consumption.kwh = req.kwh();
        consumption.readingAt = req.readingAt();

        consumptionRepo.persist(consumption);
        return toResponse(consumption);
    }

    @Transactional
    public List<ConsumptionResponse> createBatch(ConsumptionBatchRequest req) {
        return req.consumptions().stream()
                .map(this::create)
                .collect(Collectors.toList());
    }

    public ConsumptionResponse findById(Long id) {
        return consumptionRepo.findByIdOptional(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Consumption not found"));
    }

    public List<ConsumptionResponse> listByMeter(Long meterId) {
        return consumptionRepo.findByMeterId(meterId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ConsumptionResponse> listByMeterAndDateRange(Long meterId, LocalDateTime start, LocalDateTime end) {
        return consumptionRepo.findByMeterIdAndDateRange(meterId, start, end).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ConsumptionResponse getLatestReading(Long meterId) {
        return consumptionRepo.findLatestByMeterId(meterId)
                .map(this::toResponse)
                .orElse(null);
    }

    public BigDecimal calculateTotalConsumption(Long meterId, LocalDateTime start, LocalDateTime end) {
        List<Consumption> consumptions = consumptionRepo.findByMeterIdAndDateRange(meterId, start, end);
        return consumptions.stream()
                .map(c -> c.kwh)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calculateAverageConsumption(Long meterId, LocalDateTime start, LocalDateTime end) {
        List<Consumption> consumptions = consumptionRepo.findByMeterIdAndDateRange(meterId, start, end);
        if (consumptions.isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal total = consumptions.stream()
                .map(c -> c.kwh)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return total.divide(BigDecimal.valueOf(consumptions.size()), 3, RoundingMode.HALF_UP);
    }

    // Helper method
    private ConsumptionResponse toResponse(Consumption c) {
        return new ConsumptionResponse(
                c.id,
                c.meter.id,
                c.meter.meterCode,
                c.kwh,
                c.readingAt,
                c.createdAt);
    }
}
