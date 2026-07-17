package com.schedulify.TimeTable_generator.solver;

import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.PlanningScore;
import ai.timefold.solver.core.api.domain.solution.PlanningSolution;
import ai.timefold.solver.core.api.domain.solution.ProblemFactCollectionProperty;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.HardSoftScore;
import com.schedulify.TimeTable_generator.entity.*;
import lombok.*;

import java.util.List;

@PlanningSolution
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TimeTable {

    @ProblemFactCollectionProperty
    @ValueRangeProvider(id = "timeSlotRange")
    private List<TimeSlot> timeSlots;

    @ProblemFactCollectionProperty
    @ValueRangeProvider(id = "roomRange")
    private List<Room> rooms;

    @PlanningEntityCollectionProperty
    private List<TimeTableEntry> timeTableEntries;

    @PlanningScore
    private HardSoftScore score;

    @ProblemFactCollectionProperty
    private List<TeacherAvailability>  availability;

    @ProblemFactCollectionProperty
    private List<FacultyPreference>  facultyPreferences;

}
