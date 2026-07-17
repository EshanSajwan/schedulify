package com.schedulify.TimeTable_generator.dto;

import java.time.LocalTime;

public record TimeTableResponse(
        Long id,
        String subjectName,
        String teacherName,
        String classGroupName,
        String roomNumber,
        String day,
        LocalTime startTime,
        LocalTime endTime
) {
}
