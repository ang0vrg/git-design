package org.acme.DTO;

import java.util.List;

public record ConsumptionBatchRequest(
        List<ConsumptionCreateRequest> consumptions) {
}
