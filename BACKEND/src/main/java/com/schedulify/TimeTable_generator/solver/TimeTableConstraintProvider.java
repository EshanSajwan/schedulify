package com.schedulify.TimeTable_generator.solver;

import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import com.schedulify.TimeTable_generator.constraint.hard.*;
import com.schedulify.TimeTable_generator.constraint.soft.ConsecutiveLectureConstraint;
import com.schedulify.TimeTable_generator.constraint.soft.LunchBreakConstraint;
import com.schedulify.TimeTable_generator.constraint.soft.MaxLecturePerDayConstraint;
import org.jspecify.annotations.NonNull;

public class TimeTableConstraintProvider implements ConstraintProvider {

    private final TeacherConstraint teacherConstraint
            =  new TeacherConstraint();
    private final RoomConstraint roomConstraint
            = new RoomConstraint();
    private final TeacherAvailabilityConstraint teacherAvailabilityConstraint
            = new TeacherAvailabilityConstraint();
    private final LabRoomConstraint labRoomConstraint
            = new LabRoomConstraint();
    private final ClassGroupConflict classGroupConflict
            = new ClassGroupConflict();
    private final MaxLecturePerDayConstraint maxLecturePerDayConstraint
            = new MaxLecturePerDayConstraint();
    private final LunchBreakConstraint lunchBreakConstraint
            = new LunchBreakConstraint();
    private final ConsecutiveLectureConstraint  consecutiveLectureConstraint
            = new ConsecutiveLectureConstraint();

    @Override
    public Constraint @NonNull [] defineConstraints(@NonNull ConstraintFactory factory) {
        return new Constraint[]{
                teacherConstraint.
                        teacherConflict(factory),
                roomConstraint.
                        roomConflict(factory),
                teacherAvailabilityConstraint.
                        teachingAvailabilityConflict(factory),
                labRoomConstraint.
                        labRoomConflict(factory),
                classGroupConflict
                        .classGroupConflict(factory),
                maxLecturePerDayConstraint
                        .maxLecturePerDayConstraint(factory),
                lunchBreakConstraint
                        .lunchBreakConstraint(factory),
                consecutiveLectureConstraint
                        .consecutiveLectureConstraint(factory)
        };
    }
}
