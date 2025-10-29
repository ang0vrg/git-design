// org/acme/DTO/UserRegisterRequest.java
package org.acme.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRegisterRequest {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Email
    @NotBlank
    private String email;
    private String phone;
    @NotBlank
    private String password;
    @NotBlank
    private String confirmPassword;
}