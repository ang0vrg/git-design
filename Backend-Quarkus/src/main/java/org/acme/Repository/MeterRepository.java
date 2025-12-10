package org.acme.Repository;

import org.acme.Entity.Meter;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class MeterRepository implements PanacheRepository<Meter> {

    public List<Meter> findByBuildingId(Long buildingId) {
        return list("building.id", buildingId);
    }

    public Optional<Meter> findByMeterCode(String meterCode) {
        return find("meterCode", meterCode).firstResultOptional();
    }

    public boolean existsByMeterCode(String meterCode) {
        return count("meterCode", meterCode) > 0;
    }
}
