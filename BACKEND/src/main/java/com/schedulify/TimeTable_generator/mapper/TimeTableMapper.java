package com.schedulify.TimeTable_generator.mapper;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import org.springframework.stereotype.Component;

@Component
public class TimeTableMapper {
    public TimeTableResponse generateTimeTableResponse( TimeTableEntry timeTableEntry ) {
        return new TimeTableResponse(
                timeTableEntry.getId(),
                timeTableEntry.getTeachingAssignment().getSubject().getName(),
                timeTableEntry.getTeachingAssignment().getTeacher().getName(),
                timeTableEntry.getTeachingAssignment().getClassGroup().getName(),
                timeTableEntry.getRoom().getRoomNumber().toString(),
                timeTableEntry.getTimeSlot().getDay().toString(),
                timeTableEntry.getTimeSlot().getStartTime(),
                timeTableEntry.getTimeSlot().getEndTime()
        );
    }
}
