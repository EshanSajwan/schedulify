package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.entity.TimeTableRun;
import com.schedulify.TimeTable_generator.enums.RunStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TimeTableRunRepository extends JpaRepository<TimeTableRun, Long> {
    List<TimeTableResponse> findAllById(Long id);

    Optional<TimeTableRun> findByStatus(RunStatus status);

    List<TimeTableRun> findAllByStatus(RunStatus runStatus);
}
