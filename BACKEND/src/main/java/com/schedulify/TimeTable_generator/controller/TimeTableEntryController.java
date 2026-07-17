package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.TimeTableRequest;
import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.serviceImp.TimeTableServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/timetable-entry")
@RequiredArgsConstructor
public class TimeTableEntryController {

    private final TimeTableServiceImp timeTableServiceImp;

    @PostMapping
    public TimeTableResponse createTimeTableEntry(@Valid @RequestBody TimeTableRequest timeTableRequest) {
        return timeTableServiceImp.create(timeTableRequest);
    }

    @GetMapping
    public List<TimeTableResponse> getAllTimeTableEntries() {
        return timeTableServiceImp.getAll();
    }

}
