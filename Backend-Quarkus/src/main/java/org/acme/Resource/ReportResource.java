package org.acme.Resource;

import org.acme.DTO.*;
import org.acme.Entity.Report.ReportType;
import org.acme.Service.ReportService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Path("/api/reports")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ReportResource {

    @Inject
    ReportService reportService;

    @POST
    public Response create(ReportCreateRequest req) {
        try {
            ReportResponse response = reportService.create(req);
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
            ReportResponse response = reportService.findById(id);
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
            reportService.delete(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @GET
    @Path("/building/{buildingId}")
    public List<ReportResponse> listByBuilding(@PathParam("buildingId") Long buildingId) {
        return reportService.listByBuilding(buildingId);
    }

    @GET
    @Path("/building/{buildingId}/summary")
    public List<ReportSummaryResponse> listByBuildingSummary(@PathParam("buildingId") Long buildingId) {
        return reportService.listByBuildingSummary(buildingId);
    }

    @GET
    @Path("/type/{type}")
    public List<ReportResponse> listByType(@PathParam("type") ReportType type) {
        return reportService.listByType(type);
    }

    @POST
    @Path("/generate/daily")
    public Response generateDaily(
            @QueryParam("buildingId") Long buildingId,
            @QueryParam("date") String dateStr) {
        try {
            LocalDate date = LocalDate.parse(dateStr);
            ReportResponse response = reportService.generateDailyReport(buildingId, date);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @POST
    @Path("/generate/weekly")
    public Response generateWeekly(
            @QueryParam("buildingId") Long buildingId,
            @QueryParam("weekStart") String weekStartStr) {
        try {
            LocalDate weekStart = LocalDate.parse(weekStartStr);
            ReportResponse response = reportService.generateWeeklyReport(buildingId, weekStart);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @POST
    @Path("/generate/monthly")
    public Response generateMonthly(
            @QueryParam("buildingId") Long buildingId,
            @QueryParam("month") String monthStr) {
        try {
            YearMonth month = YearMonth.parse(monthStr);
            ReportResponse response = reportService.generateMonthlyReport(buildingId, month);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    @POST
    @Path("/generate/custom")
    public Response generateCustom(
            @QueryParam("buildingId") Long buildingId,
            @QueryParam("start") String startStr,
            @QueryParam("end") String endStr) {
        try {
            LocalDate start = LocalDate.parse(startStr);
            LocalDate end = LocalDate.parse(endStr);
            ReportResponse response = reportService.generateCustomReport(buildingId, start, end);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        }
    }

    // Helper record
    public record ErrorResponse(String message) {
    }
}
