package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.TeachingAssDTO;
import com.schedulify.TimeTable_generator.entity.TeachingAssignment;
import com.schedulify.TimeTable_generator.serviceImp.TeachingAssignmentServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/teaching-assignment")
public class TeachingAssignmentController {

    private final TeachingAssignmentServiceImp teachingAssignmentServiceImp;

    @PostMapping
    private TeachingAssignment addTeachingAssignment(@RequestBody TeachingAssDTO teachingAssDTO){
        return teachingAssignmentServiceImp.add(teachingAssDTO);
    }
    @GetMapping
    private List<TeachingAssignment> getTeachingAssignments(){
        return teachingAssignmentServiceImp.getAll();
    }

    @PutMapping("{tAssId}")
    private String update(@PathVariable long tAssId , @RequestBody TeachingAssDTO teachingAssDTO){
        teachingAssignmentServiceImp.update(tAssId , teachingAssDTO);
        return "success";
    }

    @DeleteMapping("{tAssId}")
    private String delete(@PathVariable long tAssId){
        teachingAssignmentServiceImp.delete(tAssId);
        return "success";
    }
}
