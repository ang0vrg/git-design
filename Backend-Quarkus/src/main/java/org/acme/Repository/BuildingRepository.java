package org.acme.Repository;

import org.acme.Entity.Building;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class BuildingRepository implements PanacheRepository<Building> {

    public List<Building> findByCity(String city) {
        return list("city", city);
    }

    public List<Building> findByCountry(String country) {
        return list("country", country);
    }

    public List<Building> searchByName(String name) {
        return list("LOWER(name) LIKE LOWER(?1)", "%" + name + "%");
    }
}
