package com.schedulify.TimeTable_generator.entity;

import ai.timefold.solver.core.api.domain.common.PlanningId;
import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Lectures")
@Builder
@PlanningEntity
public class TimeTableEntry { // ye hi asal me lectures hain
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @PlanningId
    private Long planningId;

    @ManyToOne(fetch = FetchType.LAZY , optional = false)
    @JoinColumn(name = "teaching_assignment_id")
    private TeachingAssignment teachingAssignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @PlanningVariable(valueRangeProviderRefs = "roomRange")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timeSlot_id")
    @PlanningVariable(valueRangeProviderRefs = "timeSlotRange")
    private TimeSlot timeSlot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_table_id")
    private TimeTableRun timeTableRun;
}
