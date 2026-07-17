package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.entity.ClassGroup;
import com.schedulify.TimeTable_generator.serviceImp.ClassGroupServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/class-group")
public class ClassGroupController {
    private final ClassGroupServiceImp classGroupServiceImp;

    @PostMapping
    private String addClassGroup(@RequestBody ClassGroup classGroup){
        classGroupServiceImp.add(classGroup);
        return "success";
    }

    @GetMapping
    private List<ClassGroup> getAllClassGroup(){
        return classGroupServiceImp.getAll();
    }

    @DeleteMapping("{cgId}")
    private String deleteClassGroup(@PathVariable long cgId){
        classGroupServiceImp.deleteById(cgId);
        return "success";
    }

    @PutMapping("{cgId}")
    private String updateClassGroup(@PathVariable long cgId ,@RequestBody ClassGroup classGroup){
        classGroupServiceImp.update(cgId , classGroup);
        return "success";
    }
}
