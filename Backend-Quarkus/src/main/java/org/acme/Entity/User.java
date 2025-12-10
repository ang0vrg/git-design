// Backend-Quarkus\src\main\java\org\acme\Entity\User.java
package org.acme.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User extends PanacheEntity {

    @Column(name = "username", nullable = false, unique = true)
    public String username;

    @Column(name = "email", nullable = false, unique = true)
    public String email;

    @Column(name = "password_hash", nullable = false)
    public String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    public Role role = Role.CLIENT;

    @Column(name = "phone")
    public String phone;

    @Column(name = "profile_image_url")
    public String profileImageUrl;

    @Column(name = "created_at")
    public LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    public LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum Role {
        ADMIN, OPERATOR, CLIENT
    }
}