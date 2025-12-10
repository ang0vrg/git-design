package org.acme.Repository;

import org.acme.Entity.Consumption;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ConsumptionRepository implements PanacheRepository<Consumption> {

    public List<Consumption> findByMeterId(Long meterId) {
        return list("meter.id ORDER BY readingAt DESC", meterId);
    }

    public List<Consumption> findByMeterIdAndDateRange(Long meterId, LocalDateTime start, LocalDateTime end) {
        return list("meter.id = ?1 AND readingAt BETWEEN ?2 AND ?3 ORDER BY readingAt DESC",
                meterId, start, end);
    }

    public Optional<Consumption> findLatestByMeterId(Long meterId) {
        return find("meter.id ORDER BY readingAt DESC", meterId).firstResultOptional();
    }
}
