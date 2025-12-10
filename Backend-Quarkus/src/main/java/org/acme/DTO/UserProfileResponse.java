// org/acme/DTO/UserProfileResponse.java
package org.acme.DTO;

import org.acme.Entity.User.Role;
import java.time.LocalDateTime;

public record UserProfileResponse(
        Integer id,
        String username,
        String email,
        Role role,
        String phone,
        String profileImageUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
