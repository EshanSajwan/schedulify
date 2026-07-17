package com.schedulify.TimeTable_generator.constraint.soft;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintCollectors;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.TimeTable_generator.entity.FacultyPreference;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;

public class MaxLecturePerDayConstraint {

    public Constraint maxLecturePerDayConstraint(
            ConstraintFactory constraintFactory){

        return constraintFactory
                .forEach(TimeTableEntry.class)
                .groupBy(
                        entry ->
                                entry.getTeachingAssignment()
                                        .getTeacher(),
                        entry ->
                                entry.getTimeSlot()
                                        .getDay(),
                        ConstraintCollectors.count()
                )
                .join(
                        FacultyPreference.class,
                        Joiners.equal(
                                (teacher , day , count) ->
                                        teacher ,
                                FacultyPreference::getTeacher
                        )
                )
                .filter(
                        (teacher ,
                         day ,
                         lectureCount,
                         preference)->

                                preference.getMaxLecturesPerDay() != null
                                        &&
                                        lectureCount >
                                                preference.getMaxLecturesPerDay()
                )
                .penalize(
                        HardSoftScore.ONE_SOFT,
                        (teacher ,
                         day ,
                         lectureCount ,
                         preference) ->

                                lectureCount -
                                        preference.getMaxLecturesPerDay()

                )
                .asConstraint( "Max Lecture Per Day Constraint"
                );
    }
}
