package org.acme.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
public class Alert extends PanacheEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    public Building building;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    public AlertType type;

    @Column(name = "message", length = 255)
    public String message;

    @Column(name = "is_read")
    public Boolean isRead = false;

    @Column(name = "created_at")
    public LocalDateTime createdAt = LocalDateTime.now();

    public enum AlertType {
        HIGH_CONSUMPTION,
        POWER_OUTAGE,
        FAULT
    }
}
