// Backend-Quarkus\src\main\java\org\acme\Service\UserService.java
package org.acme.Service;

import org.acme.DTO.UserResponse;
import org.acme.Entity.User;
import org.acme.Repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import io.smallrye.jwt.build.Jwt;
import org.mindrot.jbcrypt.BCrypt;

import java.time.Duration;
import java.util.Optional;
import java.util.Set;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository repo;

    @ConfigProperty(name = "mp.jwt.verify.issuer", defaultValue = "energyiq")
    String issuer;

    /* LOGIN → devuelve JWT o null */
    public String login(String email, String rawPassword) {
        return repo.findByEmail(email)
                .filter(u -> BCrypt.checkpw(rawPassword, u.passwordHash))
                .map(u -> Jwt.issuer(issuer)
                        .upn(u.email)
                        .groups(Set.of(u.role.name()))
                        .claim("name", u.username)
                        .expiresIn(Duration.ofHours(4))
                        .sign())
                .orElse(null);
    }

    /* REGISTER → devuelve DTO */
    @Transactional
    public UserResponse create(User u) {
        if (repo.existsByEmail(u.email))
            throw new IllegalArgumentException("Email duplicado");
        u.passwordHash = BCrypt.hashpw(u.passwordHash, BCrypt.gensalt());
        repo.persist(u);
        return new UserResponse(u.id.intValue(), u.username, u.email, u.role, u.phone);
    }

    /* JPAStreamer: lista solo CLIENTES */
    public java.util.List<UserResponse> listClients() {
        return repo.streamClients()
                .map(u -> new UserResponse(u.id.intValue(), u.username, u.email, u.role, u.phone))
                .toList();
    }
}