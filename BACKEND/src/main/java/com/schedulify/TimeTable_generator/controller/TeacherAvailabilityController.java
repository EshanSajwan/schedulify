package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.TeacherAvailabilityDTO;
import com.schedulify.TimeTable_generator.entity.TeacherAvailability;
import com.schedulify.TimeTable_generator.serviceImp.TeacherAvailabilityServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/teacher-availability")
public class TeacherAvailabilityController {

    private final TeacherAvailabilityServiceImp teacherAvailabilityServiceImp;

    @PostMapping
    public String addTeacherAvailability(@RequestBody TeacherAvailabilityDTO teacherAvailabilityDTO){
        teacherAvailabilityServiceImp.add(teacherAvailabilityDTO);
        return "success";
    }
    @GetMapping
    public List<TeacherAvailability> getAllTeacherAvailability(){
        return teacherAvailabilityServiceImp.getAll();
    }

    @PutMapping("{tAvId}")
    private String update(@PathVariable long tAvId , @RequestBody TeacherAvailabilityDTO teacherAvailabilityDTO){
        teacherAvailabilityServiceImp.update(tAvId , teacherAvailabilityDTO);
        return "success";
    }

    @DeleteMapping("{tAvId}")
    private String delete(@PathVariable long tAvId){
        teacherAvailabilityServiceImp.delete(tAvId);
        return "success";
    }

}
