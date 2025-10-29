// org/acme/DTO/UserResponse.java
package org.acme.DTO;

import org.acme.Entity.User.Role;

public record UserResponse(Integer id, String username, String email, Role role, String phone) {
}