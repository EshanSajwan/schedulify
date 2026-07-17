package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.solver.TimeTable;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface TimeTableSolverService {

    void publishRun(Long runId);

    List<TimeTableResponse> getActiveTimetable();

    List<TimeTableResponse> getTimetableForStudent(String email);

    public TimeTable solve() throws ExecutionException, InterruptedException;
}
