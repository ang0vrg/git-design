package org.acme.Repository;

import org.acme.Entity.Alert;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AlertRepository implements PanacheRepository<Alert> {

    public List<Alert> findByBuildingId(Long buildingId) {
        return list("building.id ORDER BY createdAt DESC", buildingId);
    }

    public List<Alert> findUnreadAlerts() {
        return list("isRead = false ORDER BY createdAt DESC");
    }

    public List<Alert> findByBuildingIdAndUnread(Long buildingId) {
        return list("building.id = ?1 AND isRead = false ORDER BY createdAt DESC", buildingId);
    }

    public long countUnreadByBuildingId(Long buildingId) {
        return count("building.id = ?1 AND isRead = false", buildingId);
    }
}
