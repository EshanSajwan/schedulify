package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.dto.TimeTableRunResponse;
import com.schedulify.TimeTable_generator.dto.TimeTableStatsResponse;
import com.schedulify.TimeTable_generator.mapper.TimeTableMapper;
import com.schedulify.TimeTable_generator.serviceImp.TimeTableSolverServiceImp;
import com.schedulify.TimeTable_generator.solver.TimeTable;
import com.schedulify.TimeTable_generator.solver.TimeTableDataBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("api/timetable")
@RequiredArgsConstructor
public class TimeTableController {
    private final TimeTableDataBuilder timeTableDataBuilder;

    private final TimeTableSolverServiceImp timeTableSolverServiceImp;

    private  final TimeTableMapper mapper;

    @PostMapping("generate")
    public List<TimeTableResponse> generateTimeTable() throws ExecutionException, InterruptedException {

        TimeTable timeTable = timeTableSolverServiceImp.solve();

        return timeTable
                .getTimeTableEntries()
                .stream()
                .map(mapper::generateTimeTableResponse)
                .toList();
    }

    @GetMapping("debug")
    public TimeTable debug() {
        return timeTableDataBuilder.build();
    }

    @GetMapping("run")
    public List<TimeTableRunResponse> run() throws ExecutionException, InterruptedException {
        return timeTableSolverServiceImp.getAllTimeTableRun();
    }

    @GetMapping("run/{id}")
    public List<TimeTableResponse> getByRunId(@PathVariable Long id) throws ExecutionException, InterruptedException {
        return timeTableSolverServiceImp.getTTByRunId(id);
    }

    @DeleteMapping("run/{id}")
    public ResponseEntity deleteByRunId(@PathVariable Long id) throws ExecutionException, InterruptedException {
        timeTableSolverServiceImp.deleteByRunId(id);
        return ResponseEntity.ok("DELETED");
    }

    @GetMapping("run/stats")
    public TimeTableStatsResponse getStats() throws ExecutionException, InterruptedException {
        return timeTableSolverServiceImp.getStats();
    }

    @PostMapping("/run/{id}/publish")
    public ResponseEntity<String> publish(@PathVariable Long id) {

        timeTableSolverServiceImp.publishRun(id);

        return ResponseEntity.ok("Published");

    }

    @GetMapping("/active")
    public List<TimeTableResponse> getActiveTimetable() {

        return timeTableSolverServiceImp.getActiveTimetable();

    }

}
