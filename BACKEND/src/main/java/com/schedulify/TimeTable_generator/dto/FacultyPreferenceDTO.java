package com.schedulify.TimeTable_generator.dto;

public record FacultyPreferenceDTO(
        Long teacherId,
        Integer maxLecturesPerDay,
        Boolean avoidConsecutiveLectures,
        Boolean prefersLunchBreak
) {
}

