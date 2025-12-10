package org.acme.Resource;

import org.acme.DTO.*;
import org.acme.Service.AlertService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/alerts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlertResource {

    @Inject
    AlertService alertService;

    @POST
    public Response create(AlertCreateRequest req) {
        try {
            AlertResponse response = alertService.create(req);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            AlertResponse response = alertService.findById(id);
            return Response.ok(response).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @PUT
    @Path("/{id}/read")
    public Response markAsRead(@PathParam("id") Long id) {
        try {
            AlertResponse response = alertService.markAsRead(id);
            return Response.ok(response).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            alertService.delete(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/building/{buildingId}")
    public List<AlertResponse> listByBuilding(@PathParam("buildingId") Long buildingId) {
        return alertService.listByBuilding(buildingId);
    }

    @GET
    @Path("/unread")
    public List<AlertResponse> listUnread() {
        return alertService.listUnread();
    }

    @GET
    @Path("/building/{buildingId}/unread")
    public List<AlertResponse> listUnreadByBuilding(@PathParam("buildingId") Long buildingId) {
        return alertService.listUnreadByBuilding(buildingId);
    }

    @GET
    @Path("/building/{buildingId}/unread/count")
    public Response getUnreadCount(@PathParam("buildingId") Long buildingId) {
        long count = alertService.getUnreadCount(buildingId);
        return Response.ok(new UnreadCountResponse(count)).build();
    }

    @PUT
    @Path("/building/{buildingId}/read-all")
    public Response markAllAsRead(@PathParam("buildingId") Long buildingId) {
        try {
            alertService.markAllAsRead(buildingId);
            return Response.ok(new SuccessResponse("All alerts marked as read")).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    // Helper records
    public record ErrorResponse(String message) {
    }

    public record UnreadCountResponse(long count) {
    }

    public record SuccessResponse(String message) {
    }
}
