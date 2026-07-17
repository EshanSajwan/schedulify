package com.schedulify.TimeTable_generator.constraint.soft;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.TimeTable_generator.entity.FacultyPreference;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;

import java.time.LocalTime;

public class LunchBreakConstraint {

    public Constraint lunchBreakConstraint(
            ConstraintFactory constraintFactory){

        return constraintFactory
                .forEach(TimeTableEntry.class)

                .join(
                        FacultyPreference.class,

                        Joiners.equal(
                                entry->
                                        entry.getTeachingAssignment()
                                                .getTeacher(),
                                FacultyPreference::getTeacher
                        )
                )
                .filter(
                        (entry , preference)->
                                Boolean.TRUE.equals(
                                        preference.getPrefersLunchBreak()
                                )
                )
                .filter(
                        (entry , preference)->{
                            LocalTime start =
                                    entry.getTimeSlot().getStartTime();
                            LocalTime end =
                                    entry.getTimeSlot().getEndTime();
                            LocalTime lunchStart =
                                    LocalTime.of(13 , 0);
                            LocalTime lunchEnd =
                                    LocalTime.of(14 , 0);

                            return
                                start.isBefore(lunchEnd)
                                &&
                                end.isAfter(lunchStart);
                        }
                )
                .penalize(
                        HardSoftScore.ONE_SOFT
                )
                .asConstraint( "Lunch Break Constraint"
                );
    }
}
