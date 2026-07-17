package com.schedulify.TimeTable_generator.constraint.hard;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;

public class RoomConstraint {
    public Constraint roomConflict(ConstraintFactory constraintFactory) {

        return constraintFactory
                .forEachUniquePair(
                        TimeTableEntry.class,
                        Joiners.equal(
                                TimeTableEntry::getRoom),
                        Joiners.equal(
                                TimeTableEntry::getTimeSlot)
                        )
                .penalize(
                        HardSoftScore.ONE_HARD)
                .asConstraint(
                        "Room Conflict");
    }
}
