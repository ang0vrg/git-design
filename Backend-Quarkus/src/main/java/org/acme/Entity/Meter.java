package org.acme.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "meters")
public class Meter extends PanacheEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    public Building building;

    @Column(name = "meter_code", nullable = false, unique = true, length = 30)
    public String meterCode;

    @Column(name = "model", length = 60)
    public String model;

    @Column(name = "installation_at")
    public LocalDateTime installationAt = LocalDateTime.now();

    @OneToMany(mappedBy = "meter", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Consumption> consumptions;
}
