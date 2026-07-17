package com.schedulify.TimeTable_generator.constraint.hard;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.TimeTable_generator.entity.TeacherAvailability;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;

public class TeacherAvailabilityConstraint {
    public Constraint teachingAvailabilityConflict(ConstraintFactory constraintFactory) {
        return constraintFactory
                .forEach(TimeTableEntry.class)
                .join(
                        TeacherAvailability.class,
                        Joiners.equal(
                                entry ->
                                        entry.getTeachingAssignment()
                                                .getTeacher(),
                                TeacherAvailability::getTeacher
                        ),
                        Joiners.equal(
                                TimeTableEntry::getTimeSlot,
                                TeacherAvailability::getTimeSlot
                        )
                )
                .filter(
                        (entry , availability)
                            -> !availability.getAvailable()
                )
                .penalize(
                        HardSoftScore.ONE_HARD)
                .asConstraint(
                        "Teacher Unavailable");
    }
}
