package com.schedulify.TimeTable_generator.solver;

import com.schedulify.TimeTable_generator.entity.Room;
import com.schedulify.TimeTable_generator.entity.TeachingAssignment;
import com.schedulify.TimeTable_generator.entity.TimeSlot;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import com.schedulify.TimeTable_generator.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TimeTableDataBuilder {
    private final RoomsRepository roomsRepo;
    private final TimeSlotsRepository timeSlotsRepo;
    private final TeachingAssignmentRepository teachingAssignmentRepo;
    private final TeacherAvailabilityRepository teacherAvailabilityRepo;
    private final FacultyPreferenceRepository facultyPreferenceRepo;

    public TimeTable build() {
        List<Room> rooms = roomsRepo.findAll();
        List<TimeSlot> timeSlots  = timeSlotsRepo.findAll();
        List<TimeTableEntry> timeTableEntries = buildEntries(teachingAssignmentRepo.findAll());

//        return TimeTable.builder() /////// ye mera hai/////
//                .rooms(rooms)
//                .timeSlots(timeSlots)
//                .timeTableEntries(timeTableEntries)
//                .availability(teacherAvailabilityRepo.findAll())
//                .facultyPreferences(facultyPreferenceRepo.findAll())
//                .build();

        List<TeachingAssignment> assignments =
                teachingAssignmentRepo.findAll();
        System.out.println("========== DATA CHECK ==========");
        System.out.println("Rooms: " + rooms.size());
        System.out.println("Time Slots: " + timeSlots.size());
        System.out.println("Teaching Assignments: " + assignments.size());
        System.out.println("Generated Lectures: " + timeTableEntries.size());
        System.out.println("Availability Records: "
                + teacherAvailabilityRepo.count());
        System.out.println("Preference Records: "
                + facultyPreferenceRepo.count());
        System.out.println("===============================");

        return TimeTable.builder()
                .rooms(rooms)
                .timeSlots(timeSlots)
                .timeTableEntries(timeTableEntries)
                .availability(teacherAvailabilityRepo.findAll())
                .facultyPreferences(facultyPreferenceRepo.findAll())
                .build();
    }

    private List<TimeTableEntry> buildEntries(List<TeachingAssignment> all) {
        List<TimeTableEntry> timeTableEntries = new ArrayList<>();

        long idCounter = 1L;
        for (TeachingAssignment teachingAssignment : all) {
            for(int i = 0 ; i < teachingAssignment.getWeeklyFrequency() ; i++){

                TimeTableEntry timeTableEntry = new TimeTableEntry();
                timeTableEntry.setPlanningId(idCounter++);
                timeTableEntry.setTeachingAssignment(teachingAssignment);

                timeTableEntries.add(timeTableEntry);

            }
        }
        return timeTableEntries;
    }
}
