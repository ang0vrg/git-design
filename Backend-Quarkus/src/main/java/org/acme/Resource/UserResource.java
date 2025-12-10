// Backend-Quarkus\src\main\java\org\acme\Resource\UserResource.java
package org.acme.Resource;

import org.acme.DTO.UserProfileResponse;
import org.acme.DTO.UserUpdateRequest;
import org.acme.Service.UserService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.jboss.logging.Logger;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Path("/api/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService service;

    private static final Logger LOG = Logger.getLogger(UserResource.class);

    private static final String UPLOAD_DIR = "uploads/profiles/";
    private static final String[] ALLOWED_EXTENSIONS = { ".jpg", ".jpeg", ".png", ".webp", ".gif" };

    @GET
    @Path("/profile")
    @RolesAllowed({ "CLIENT", "ADMIN", "OPERATOR" })
    public Response getProfile(@Context SecurityContext ctx) {
        try {
            String email = ctx.getUserPrincipal().getName();
            LOG.info("Fetching profile for email: " + email);
            UserProfileResponse profile = service.getProfileByEmail(email);
            return Response.ok(profile).build();
        } catch (IllegalArgumentException e) {
            LOG.error("Error fetching profile", e);
            return Response.status(404)
                    .entity(Map.of("ok", false, "msg", e.getMessage()))
                    .build();
        } catch (Exception e) {
            LOG.error("Unexpected error fetching profile", e);
            return Response.serverError()
                    .entity(Map.of("ok", false, "msg", "Error interno del servidor"))
                    .build();
        }
    }

    @PUT
    @Path("/profile")
    @RolesAllowed({ "CLIENT", "ADMIN", "OPERATOR" })
    public Response updateProfile(@Context SecurityContext ctx, @Valid UserUpdateRequest request) {
        try {
            String email = ctx.getUserPrincipal().getName();
            UserProfileResponse updated = service.updateProfile(email, request);
            return Response.ok(Map.of("ok", true, "user", updated)).build();
        } catch (IllegalArgumentException e) {
            return Response.status(400)
                    .entity(Map.of("ok", false, "msg", e.getMessage()))
                    .build();
        }
    }

    @DELETE
    @Path("/profile")
    @RolesAllowed({ "CLIENT", "ADMIN", "OPERATOR" })
    public Response deleteAccount(@Context SecurityContext ctx) {
        try {
            String email = ctx.getUserPrincipal().getName();
            service.deleteAccount(email);
            return Response.ok(Map.of("ok", true, "msg", "Cuenta eliminada exitosamente")).build();
        } catch (IllegalArgumentException e) {
            return Response.status(400)
                    .entity(Map.of("ok", false, "msg", e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/profile/image")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @RolesAllowed({ "CLIENT", "ADMIN", "OPERATOR" })
    public Response uploadProfileImage(@Context SecurityContext ctx, MultipartFormDataInput input) {
        try {
            String email = ctx.getUserPrincipal().getName();
            LOG.info("Uploading profile image for email: " + email);

            Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
            List<InputPart> inputParts = uploadForm.get("file");

            if (inputParts == null || inputParts.isEmpty()) {
                return Response.status(400)
                        .entity(Map.of("ok", false, "msg", "No se proporcionó ningún archivo"))
                        .build();
            }

            InputPart inputPart = inputParts.get(0);

            // Get filename from content-disposition header
            String[] contentDisposition = inputPart.getHeaders().getFirst("Content-Disposition").split(";");
            String filename = null;
            for (String cd : contentDisposition) {
                if (cd.trim().startsWith("filename")) {
                    filename = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
                }
            }

            if (filename == null || filename.isEmpty()) {
                return Response.status(400)
                        .entity(Map.of("ok", false, "msg", "Nombre de archivo inválido"))
                        .build();
            }

            // Validate file extension
            String extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
            boolean validExtension = false;
            for (String ext : ALLOWED_EXTENSIONS) {
                if (extension.equals(ext)) {
                    validExtension = true;
                    break;
                }
            }

            if (!validExtension) {
                return Response.status(400)
                        .entity(Map.of("ok", false, "msg", "Formato de archivo no permitido. Use JPG, PNG, WebP o GIF"))
                        .build();
            }

            // Create upload directory if it doesn't exist
            java.nio.file.Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String uniqueFilename = UUID.randomUUID().toString() + extension;
            java.nio.file.Path targetPath = uploadPath.resolve(uniqueFilename);

            // Copy file to target location
            InputStream inputStream = inputPart.getBody(InputStream.class, null);
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);

            // Update user profile with image URL
            String imageUrl = "/api/user/profile/image/" + uniqueFilename;
            UserProfileResponse updated = service.updateProfileImage(email, imageUrl);

            return Response.ok(Map.of("ok", true, "user", updated, "imageUrl", imageUrl)).build();

        } catch (IOException e) {
            LOG.error("IO Error uploading profile image", e);
            return Response.status(500)
                    .entity(Map.of("ok", false, "msg", "Error al guardar la imagen: " + e.getMessage()))
                    .build();
        } catch (Exception e) {
            LOG.error("Unexpected error uploading profile image", e);
            return Response.status(500)
                    .entity(Map.of("ok", false, "msg", "Error interno del servidor"))
                    .build();
        }
    }

    @GET
    @Path("/profile/image/{filename}")
    @Produces({ "image/jpeg", "image/png", "image/webp", "image/gif" })
    public Response getProfileImage(@PathParam("filename") String filename) {
        try {
            java.nio.file.Path imagePath = Paths.get(UPLOAD_DIR).resolve(filename);

            if (!Files.exists(imagePath)) {
                return Response.status(404).build();
            }

            File imageFile = imagePath.toFile();
            String contentType = Files.probeContentType(imagePath);

            return Response.ok(imageFile)
                    .type(contentType != null ? contentType : "application/octet-stream")
                    .build();
        } catch (IOException e) {
            return Response.status(500).build();
        }
    }
}
