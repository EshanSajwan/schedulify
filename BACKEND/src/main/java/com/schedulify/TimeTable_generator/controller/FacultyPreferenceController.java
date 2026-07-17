package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.FacultyPreferenceDTO;
import com.schedulify.TimeTable_generator.entity.FacultyPreference;
import com.schedulify.TimeTable_generator.serviceImp.FacultyPreferenceServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/faculty-preference")
@RequiredArgsConstructor
public class FacultyPreferenceController {
    private final FacultyPreferenceServiceImp facultyPreferenceServiceImp;

    @PostMapping
    public FacultyPreference saveFacultyPreference(@RequestBody FacultyPreferenceDTO dto){
        return facultyPreferenceServiceImp.add(dto);
    }
    @GetMapping
    public List<FacultyPreference> findAll(){
        return facultyPreferenceServiceImp.getAll();
    }

    @PutMapping("{fpId}")
    private String update(@PathVariable long fpId , @RequestBody FacultyPreferenceDTO dto){
        facultyPreferenceServiceImp.update(fpId , dto);
        return "success";
    }

    @DeleteMapping("{fpId}")
    private String delete(@PathVariable long fpId){
        facultyPreferenceServiceImp.delete(fpId);
        return "success";
    }
}
