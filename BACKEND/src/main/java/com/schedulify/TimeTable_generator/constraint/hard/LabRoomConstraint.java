package com.schedulify.TimeTable_generator.constraint.hard;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Constraint;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import com.schedulify.TimeTable_generator.enums.RoomType;

public class LabRoomConstraint {
    public Constraint labRoomConflict(ConstraintFactory constraintFactory) {
        return constraintFactory
                .forEach(TimeTableEntry.class)
                .filter(entry ->
                        Boolean.TRUE.equals(
                                entry
                                        .getTeachingAssignment()
                                        .getSubject()
                                        .getIsLab()
                        )
                        &&
                        entry.getRoom() != null
                        &&
                                entry
                                        .getRoom()
                                        .getRoomType()
                                        .equals(RoomType.CLASSROOM)
                        )
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Lab Room Conflict");
    }
}
