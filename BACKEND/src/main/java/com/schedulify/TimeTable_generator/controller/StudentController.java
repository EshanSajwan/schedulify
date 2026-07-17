package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.dto.auth.StudentCreateRequest;
import com.schedulify.TimeTable_generator.service.TimeTableSolverService;
import com.schedulify.TimeTable_generator.serviceImp.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    private final TimeTableSolverService timeTableSolverService;

    @PostMapping
    public ResponseEntity<String> createStudent(
            @RequestBody StudentCreateRequest request) {

        studentService.createStudent(request);

        return ResponseEntity.ok(
                "Student created successfully"
        );
    }

    @GetMapping("/me/timetable")
    public List<TimeTableResponse> getMyTimetable(
            Authentication authentication) {

        return timeTableSolverService
                .getTimetableForStudent(
                        authentication.getName()
                );
    }
}