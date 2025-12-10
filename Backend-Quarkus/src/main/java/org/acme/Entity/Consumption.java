package org.acme.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "consumptions", indexes = {
        @Index(name = "idx_reading", columnList = "reading_at")
})
public class Consumption extends PanacheEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meter_id", nullable = false)
    public Meter meter;

    @Column(name = "kwh", nullable = false, precision = 10, scale = 3)
    public BigDecimal kwh;

    @Column(name = "reading_at", nullable = false)
    public LocalDateTime readingAt;

    @Column(name = "created_at")
    public LocalDateTime createdAt = LocalDateTime.now();
}
