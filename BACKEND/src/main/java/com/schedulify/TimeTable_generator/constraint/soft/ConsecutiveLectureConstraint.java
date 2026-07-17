package com.schedulify.TimeTable_generator.constraint.soft;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.TimeTable_generator.entity.FacultyPreference;
import com.schedulify.TimeTable_generator.entity.TimeSlot;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;

import java.time.Duration;
import java.time.LocalTime;

public class ConsecutiveLectureConstraint {

    public Constraint consecutiveLectureConstraint(
            ConstraintFactory constraintFactory){

        return constraintFactory
                .forEachUniquePair(
                        TimeTableEntry.class,

                        Joiners.equal(
                                entry ->
                                        entry.getTeachingAssignment()
                                                .getTeacher()
                        ),
                        Joiners.equal(
                                entry->
                                        entry.getTimeSlot()
                                                .getDay()
                        )
                )

                .join(
                        FacultyPreference.class,

                        Joiners.equal(
                                (entry1, entry2) ->
                                        entry1.getTeachingAssignment()
                                                .getTeacher(),

                                FacultyPreference::getTeacher
                        )
                )

                .filter((entry1 ,
                         entry2 ,
                         preference) ->
                        Boolean.TRUE.equals(
                                preference.getAvoidConsecutiveLectures()
                        )
                    )
                .filter(
                        (entry1 ,
                        entry2 ,
                        preference)-> {
                            TimeSlot slot1 = entry1.getTimeSlot();
                            TimeSlot slot2 = entry2.getTimeSlot();

                            LocalTime earlierEnd;
                            LocalTime laterStart;

                            if(slot1.getStartTime().isBefore(slot2.getStartTime())){
                                earlierEnd = slot1.getEndTime();
                                laterStart = slot2.getStartTime();
                            } else {
                                earlierEnd = slot2.getEndTime();
                                laterStart = slot1.getStartTime();
                            }

                            long gap =
                                    Duration.between(
                                            earlierEnd , laterStart
                                    ).toMinutes();
                            return gap <= 15;
                        }
                )

                .penalize(
                        HardSoftScore.ONE_SOFT
                )
                .asConstraint("Consecutive Lecture Constraint"
                );
    }
}
