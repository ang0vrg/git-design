package org.acme.Resource;

import org.acme.DTO.*;
import org.acme.Service.BuildingService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/buildings")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BuildingResource {

    @Inject
    BuildingService buildingService;

    @POST
    public Response create(BuildingCreateRequest req) {
        try {
            BuildingResponse response = buildingService.create(req);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    public List<BuildingResponse> listAll() {
        return buildingService.listAll();
    }

    @GET
    @Path("/summary")
    public List<BuildingSummaryResponse> listAllSummary() {
        return buildingService.listAllSummary();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            BuildingResponse response = buildingService.findById(id);
            return Response.ok(response).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, BuildingUpdateRequest req) {
        try {
            BuildingResponse response = buildingService.update(id, req);
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
            buildingService.delete(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/search")
    public List<BuildingResponse> search(@QueryParam("name") String name) {
        return buildingService.searchByName(name);
    }

    @GET
    @Path("/city/{city}")
    public List<BuildingResponse> findByCity(@PathParam("city") String city) {
        return buildingService.findByCity(city);
    }

    @GET
    @Path("/with-alerts")
    public List<BuildingResponse> getBuildingsWithActiveAlerts() {
        return buildingService.getBuildingsWithActiveAlerts();
    }

    // Error response record
    public record ErrorResponse(String message) {
    }
}
