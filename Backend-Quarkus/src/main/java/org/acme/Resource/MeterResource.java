package org.acme.Resource;

import org.acme.DTO.*;
import org.acme.Service.MeterService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/meters")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MeterResource {

    @Inject
    MeterService meterService;

    @POST
    public Response create(MeterCreateRequest req) {
        try {
            MeterResponse response = meterService.create(req);
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
            MeterResponse response = meterService.findById(id);
            return Response.ok(response).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/code/{meterCode}")
    public Response findByMeterCode(@PathParam("meterCode") String meterCode) {
        try {
            MeterResponse response = meterService.findByMeterCode(meterCode);
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
            meterService.delete(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/building/{buildingId}")
    public List<MeterResponse> listByBuilding(@PathParam("buildingId") Long buildingId) {
        return meterService.listByBuilding(buildingId);
    }

    @GET
    @Path("/validate/{meterCode}")
    public Response validateMeterCode(@PathParam("meterCode") String meterCode) {
        boolean isValid = meterService.validateMeterCode(meterCode);
        return Response.ok(new ValidationResponse(isValid)).build();
    }

    // Helper records
    public record ErrorResponse(String message) {
    }

    public record ValidationResponse(boolean isValid) {
    }
}
