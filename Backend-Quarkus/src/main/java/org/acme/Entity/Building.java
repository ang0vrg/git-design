package org.acme.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "buildings")
public class Building extends PanacheEntity {

    @Column(name = "name", nullable = false, length = 100)
    public String name;

    @Column(name = "address", length = 255)
    public String address;

    @Column(name = "city", length = 60)
    public String city;

    @Column(name = "country", length = 2)
    public String country = "PE";

    @Column(name = "lat", precision = 10, scale = 8)
    public BigDecimal lat;

    @Column(name = "lon", precision = 11, scale = 8)
    public BigDecimal lon;

    @Column(name = "created_at")
    public LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    public LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Meter> meters;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL, orphanRemoval = true)
    public List<Alert> alerts;

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
