package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeTableEntryRepository extends JpaRepository<TimeTableEntry, Integer> {

    List<TimeTableEntry> findByTimeTableRunId(Long runId);

    void deleteAllByTimeTableRunId(Long id);

    @Query("""
    SELECT t
    FROM TimeTableEntry t
    WHERE t.timeTableRun.id = :runId
    AND t.teachingAssignment.teacher.id = :teacherId
    ORDER BY t.timeSlot.day, t.timeSlot.startTime
    """)
        List<TimeTableEntry> findTeacherTimetable(
                @Param("runId") Long runId,
                @Param("teacherId") Long teacherId
        );
    List<TimeTableEntry> findByTimeTableRunIdAndTeachingAssignmentTeacherId(
            Long runId,
            Long teacherId
    );

}
