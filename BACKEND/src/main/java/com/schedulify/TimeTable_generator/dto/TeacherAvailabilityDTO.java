package com.schedulify.TimeTable_generator.dto;

public record TeacherAvailabilityDTO(
        Long teacherId,
        Long timeSlotId,
        Boolean available
) {
}
