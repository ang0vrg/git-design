// org/acme/DTO/UserUpdateRequest.java
package org.acme.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UserUpdateRequest {

    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String username;

    @Email(message = "Email inválido")
    private String email;

    @Size(min = 10, max = 20, message = "El teléfono debe tener entre 10 y 20 caracteres")
    private String phone;

    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String newPassword;

    private String currentPassword;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }
}
