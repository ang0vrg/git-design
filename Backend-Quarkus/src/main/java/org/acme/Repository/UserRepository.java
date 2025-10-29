// org/acme/Repository/UserRepository.java
package org.acme.Repository;

import org.acme.Entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.stream.Stream;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

    public Optional<User> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }

    public boolean existsByEmail(String email) {
        return count("email", email) > 0;
    }

    /* JPAStreamer example: stream CLIENTS only */
    public Stream<User> streamClients() {
        return streamAll().filter(u -> u.role == User.Role.CLIENT);
    }
}