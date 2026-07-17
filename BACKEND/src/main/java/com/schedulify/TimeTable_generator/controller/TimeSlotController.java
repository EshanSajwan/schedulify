package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.entity.TimeSlot;
import com.schedulify.TimeTable_generator.serviceImp.TimeSlotServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/time-slot")
public class TimeSlotController {

    private final TimeSlotServiceImp timeSlotServiceImp;

    @PostMapping
    private String addTimeSlot(@RequestBody TimeSlot timeSlot){
        timeSlotServiceImp.add(timeSlot);
        return "success";
    }
    @GetMapping
    private List<TimeSlot> getTimeSlots(){
        return timeSlotServiceImp.getAll();
    }

    @PutMapping("{tsId}")
    private String updateTimeSlot(@PathVariable long tsId, @RequestBody TimeSlot timeSlot){
        return timeSlotServiceImp.update(tsId , timeSlot);
    }

    @DeleteMapping("{tsId}")
    private String deleteTimeSlot(@PathVariable long tsId){
        return timeSlotServiceImp.delete(tsId);
    }
}
