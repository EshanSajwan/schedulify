package com.schedulify.TimeTable_generator.dto;

public record TimeTableStatsResponse(
        Long totalRuns,
        Long latestRunId,
        String bestScore,
        Long totalTeachers,
        Long totalSubjects,
        Long totalRooms,
        Long totalClassGroups
) {
}
