package com.schedulify.TimeTable_generator.dto;

import jakarta.validation.constraints.NotNull;

public record TimeTableRequest(
        @NotNull
        Long teachingAssignmentId,
        @NotNull
        Long roomId,
        @NotNull
        Long timeSlotId
) {
}
