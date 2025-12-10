package org.acme.Resource;

import org.acme.DTO.*;
import org.acme.Service.ConsumptionService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Path("/api/consumptions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConsumptionResource {

    @Inject
    ConsumptionService consumptionService;

    @POST
    public Response create(ConsumptionCreateRequest req) {
        try {
            ConsumptionResponse response = consumptionService.create(req);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @POST
    @Path("/batch")
    public Response createBatch(ConsumptionBatchRequest req) {
        try {
            List<ConsumptionResponse> responses = consumptionService.createBatch(req);
            return Response.status(Response.Status.CREATED).entity(responses).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            ConsumptionResponse response = consumptionService.findById(id);
            return Response.ok(response).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/meter/{meterId}")
    public List<ConsumptionResponse> listByMeter(@PathParam("meterId") Long meterId) {
        return consumptionService.listByMeter(meterId);
    }

    @GET
    @Path("/meter/{meterId}/range")
    public List<ConsumptionResponse> listByMeterAndDateRange(
            @PathParam("meterId") Long meterId,
            @QueryParam("start") String start,
            @QueryParam("end") String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return consumptionService.listByMeterAndDateRange(meterId, startDate, endDate);
    }

    @GET
    @Path("/meter/{meterId}/latest")
    public Response getLatestReading(@PathParam("meterId") Long meterId) {
        ConsumptionResponse response = consumptionService.getLatestReading(meterId);
        if (response == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse("No readings found")).build();
        }
        return Response.ok(response).build();
    }

    @GET
    @Path("/meter/{meterId}/total")
    public Response calculateTotal(
            @PathParam("meterId") Long meterId,
            @QueryParam("start") String start,
            @QueryParam("end") String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        BigDecimal total = consumptionService.calculateTotalConsumption(meterId, startDate, endDate);
        return Response.ok(new ConsumptionTotalResponse(total)).build();
    }

    @GET
    @Path("/meter/{meterId}/average")
    public Response calculateAverage(
            @PathParam("meterId") Long meterId,
            @QueryParam("start") String start,
            @QueryParam("end") String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        BigDecimal average = consumptionService.calculateAverageConsumption(meterId, startDate, endDate);
        return Response.ok(new ConsumptionAverageResponse(average)).build();
    }

    // Helper records
    public record ErrorResponse(String message) {
    }

    public record ConsumptionTotalResponse(BigDecimal total) {
    }

    public record ConsumptionAverageResponse(BigDecimal average) {
    }
}
