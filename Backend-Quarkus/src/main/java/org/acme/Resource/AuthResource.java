package org.acme.Resource;

import org.acme.DTO.*;
import org.acme.Entity.User;
import org.acme.Service.UserService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Map;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    UserService service;

    @POST
    @Path("/login")
    public Response login(@Valid UserLoginRequest req) {
        String token = service.login(req.getEmail(), req.getPassword());
        if (token == null) {
            return Response.status(401)
                    .entity(Map.of("ok", false, "msg", "Credenciales inválidas"))
                    .build();
        }
        return Response.ok(Map.of("ok", true, "token", token)).build();
    }

    @POST
    @Path("/register")
    public Response register(@Valid UserRegisterRequest dto) {
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            return Response.status(400)
                    .entity(Map.of("ok", false, "msg", "Las contraseñas no coinciden"))
                    .build();
        }
        User user = new User();
        user.username = dto.getFirstName() + " " + dto.getLastName();
        user.email = dto.getEmail();
        user.phone = dto.getPhone();
        user.passwordHash = dto.getPassword(); // se hashea en el servicio
        user.role = User.Role.CLIENT;

        try {
            UserResponse res = service.create(user);
            return Response.ok(Map.of("ok", true, "user", res)).build();
        } catch (IllegalArgumentException e) {
            return Response.status(409)
                    .entity(Map.of("ok", false, "msg", e.getMessage()))
                    .build();
        }
    }
}