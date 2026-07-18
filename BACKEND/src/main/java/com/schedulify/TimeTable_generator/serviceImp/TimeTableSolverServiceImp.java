package com.schedulify.TimeTable_generator.serviceImp;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.solver.SolverJob;
import ai.timefold.solver.core.api.solver.SolverManager;
import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.dto.TimeTableRunResponse;
import com.schedulify.TimeTable_generator.dto.TimeTableStatsResponse;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import com.schedulify.TimeTable_generator.entity.TimeTableRun;
import com.schedulify.TimeTable_generator.entity.User;
import com.schedulify.TimeTable_generator.enums.Role;
import com.schedulify.TimeTable_generator.enums.RunStatus;
import com.schedulify.TimeTable_generator.mapper.TimeTableMapper;
import com.schedulify.TimeTable_generator.repo.*;
import com.schedulify.TimeTable_generator.service.TimeTableSolverService;
import com.schedulify.TimeTable_generator.solver.TimeTable;
import com.schedulify.TimeTable_generator.solver.TimeTableDataBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class TimeTableSolverServiceImp implements TimeTableSolverService {

    private final TimeTableDataBuilder timeTableDataBuilder;
    private final SolverManager<TimeTable> solverManager;
    private final TimeTableRunRepository timeTableRunRepo;
    private final TimeTableEntryRepository timeTableEntryRepo;
    private final TimeTableMapper  timeTableMapper;
    private final TeacherRepository teacherRepo;
    private final SubjectsRepository subjectsRepo;
    private final RoomsRepository roomsRepo;
    private final ClassGroupRepository classGroupRepo;
    private final UserRepository userRepo;


    @Override
    public TimeTable solve() throws ExecutionException, InterruptedException {

        TimeTable timeTable = timeTableDataBuilder.build();
        Long problemId = System.nanoTime();
        SolverJob<TimeTable> job =
                solverManager.solve(problemId, timeTable);
        TimeTable solved = job.getFinalBestSolution();


        TimeTableRun timeTableRun = TimeTableRun
                .builder()
                .generatedAt(LocalDateTime.now())
                .score(solved.getScore().toString())
                .status(RunStatus.DRAFT)
                .build();

        Optional<TimeTableRun> activeRun =
                timeTableRunRepo.findByStatus(RunStatus.ACTIVE);


        if(activeRun.isEmpty()){
            timeTableRun.setStatus(RunStatus.ACTIVE);
        }
        else{
            HardSoftScore newScore =
                    HardSoftScore.parseScore(solved.getScore().toString());

            HardSoftScore oldScore =
                    HardSoftScore.parseScore(activeRun.get().getScore());

            if(newScore.compareTo(oldScore) >= 0){
                activeRun.get().setStatus(RunStatus.ARCHIVED);
                timeTableRunRepo.save(activeRun.get());
                timeTableRun.setStatus(RunStatus.ACTIVE);
            }
        }

        timeTableRun = timeTableRunRepo.save(timeTableRun);

        for(TimeTableEntry entry : solved.getTimeTableEntries()){
            entry.setTimeTableRun(timeTableRun);
        }

        timeTableEntryRepo.saveAll(solved.getTimeTableEntries());

        return solved;
    }

    public List<TimeTableRunResponse> getAllTimeTableRun() {

        return timeTableRunRepo
                .findAll()
                .stream()
                .map( run -> new TimeTableRunResponse(
                        run.getId(),
                        run.getGeneratedAt(),
                        run.getStatus(),
                        run.getScore()
                ))
                .toList();
    }

//    public List<TimeTableResponse> getTTByRunId(Long runId) {
//        return timeTableEntryRepo
//                .findAllByTimeTableRunId(runId)
//
////                .stream()
//////                .map(entry -> timeTableMapper.generateTimeTableResponse(entry))
//                .toList();
//
//    }

public List<TimeTableResponse> getTTByRunId(Long runId) {

    return timeTableEntryRepo
            .findByTimeTableRunId(runId)
            .stream()
            .map(timeTableMapper::generateTimeTableResponse)
            .toList();
}

    public void deleteByRunId(Long id) {
        timeTableEntryRepo.deleteAllByTimeTableRunId(id);
        timeTableRunRepo.deleteById(id);
    }

    public TimeTableStatsResponse getStats() {
        List<TimeTableRun> runs = timeTableRunRepo.findAll();

        long totalRuns = (long)runs.size();

        long latestRunId= runs.stream()
                .map(TimeTableRun::getId)
                .max(Long::compareTo).orElse(null);

        String bestScore = runs.stream()
                .map(TimeTableRun::getScore)
                .findFirst()
                .orElse("N/A");

        long totalClassGroups = classGroupRepo.count();
        long totalRooms = roomsRepo.count();
        long totalSubjects = subjectsRepo.count();
        long totalTeachers = teacherRepo.count();


        return new TimeTableStatsResponse(
                totalRuns,
                latestRunId,
                bestScore,
                totalTeachers,
                totalSubjects,
                totalRooms,
                totalClassGroups
                );
    }

    @Override
    @Transactional
    public void publishRun(Long runId) {

        List<TimeTableRun> activeRuns =
                timeTableRunRepo.findAllByStatus(RunStatus.ACTIVE);

        for (TimeTableRun run : activeRuns) {
            run.setStatus(RunStatus.ARCHIVED);
        }

        timeTableRunRepo.saveAll(activeRuns);

        TimeTableRun run =
                timeTableRunRepo.findById(runId)
                        .orElseThrow();

        run.setStatus(RunStatus.ACTIVE);

        timeTableRunRepo.save(run);

    }

    @Override
    public List<TimeTableResponse> getActiveTimetable() {

        TimeTableRun activeRun = timeTableRunRepo
                .findByStatus(RunStatus.ACTIVE)
                .orElseThrow(() ->
                        new RuntimeException("No active timetable found"));

        return timeTableEntryRepo
                .findByTimeTableRunId(activeRun.getId())
                .stream()
                .map(timeTableMapper::generateTimeTableResponse)
                .toList();
    }

    @Override
    public List<TimeTableResponse> getTimetableForStudent(String email) {

        User student = userRepo
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (student.getRole() != Role.STUDENT) {
            throw new RuntimeException("User is not a student");
        }

        if (student.getClassGroup() == null) {
            throw new RuntimeException(
                    "Student is not assigned to a class group"
            );
        }

        TimeTableRun activeRun =
                timeTableRunRepo
                        .findByStatus(RunStatus.ACTIVE)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No active timetable found"
                                ));

        Long classGroupId =
                student.getClassGroup().getId();

        return timeTableEntryRepo
                .findByTimeTableRunId(activeRun.getId())
                .stream()
                .filter(entry ->
                        entry.getTeachingAssignment()
                                .getClassGroup()
                                .getId()
                                .equals(classGroupId)
                )
                .map(timeTableMapper::generateTimeTableResponse)
                .toList();
    }
}
