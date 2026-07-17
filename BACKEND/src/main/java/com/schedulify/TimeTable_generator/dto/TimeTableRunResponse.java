package com.schedulify.TimeTable_generator.dto;

import com.schedulify.TimeTable_generator.enums.RunStatus;

import java.time.LocalDateTime;

public record TimeTableRunResponse(
        long id,
        LocalDateTime localDateTime,
        RunStatus status,
        String score
) {
}
