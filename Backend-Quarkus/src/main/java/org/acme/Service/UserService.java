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

    /* GET PROFILE by email (from JWT) */
    public org.acme.DTO.UserProfileResponse getProfileByEmail(String email) {
        return repo.findByEmail(email)
                .map(u -> new org.acme.DTO.UserProfileResponse(
                        u.id.intValue(),
                        u.username,
                        u.email,
                        u.role,
                        u.phone,
                        u.profileImageUrl,
                        u.createdAt,
                        u.updatedAt))
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
    }

    /* UPDATE PROFILE */
    @Transactional
    public org.acme.DTO.UserProfileResponse updateProfile(String email, org.acme.DTO.UserUpdateRequest request) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Update fields if provided
        if (request.getUsername() != null && !request.getUsername().isBlank()) {
            user.username = request.getUsername();
        }
        if (request.getEmail() != null && !request.getEmail().isBlank() && !request.getEmail().equals(email)) {
            if (repo.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("El email ya está en uso");
            }
            user.email = request.getEmail();
        }
        if (request.getPhone() != null) {
            user.phone = request.getPhone();
        }

        // Update password if both current and new password are provided
        if (request.getCurrentPassword() != null && request.getNewPassword() != null) {
            if (!BCrypt.checkpw(request.getCurrentPassword(), user.passwordHash)) {
                throw new IllegalArgumentException("Contraseña actual incorrecta");
            }
            user.passwordHash = BCrypt.hashpw(request.getNewPassword(), BCrypt.gensalt());
        }

        repo.persist(user);
        return new org.acme.DTO.UserProfileResponse(
                user.id.intValue(),
                user.username,
                user.email,
                user.role,
                user.phone,
                user.profileImageUrl,
                user.createdAt,
                user.updatedAt);
    }

    /* UPDATE PROFILE IMAGE */
    @Transactional
    public org.acme.DTO.UserProfileResponse updateProfileImage(String email, String imageUrl) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        user.profileImageUrl = imageUrl;
        repo.persist(user);

        return new org.acme.DTO.UserProfileResponse(
                user.id.intValue(),
                user.username,
                user.email,
                user.role,
                user.phone,
                user.profileImageUrl,
                user.createdAt,
                user.updatedAt);
    }

    /* DELETE ACCOUNT */
    @Transactional
    public void deleteAccount(String email) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        repo.delete(user);
    }
}