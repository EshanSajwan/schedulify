package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.entity.Subject;
import com.schedulify.TimeTable_generator.serviceImp.SubjectServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectServiceImp subjectServiceImp;

    @PostMapping
    private String addSubject(@RequestBody Subject subject) {
        subjectServiceImp.add(subject);
        return "success";
    }

    @PutMapping("{subId}")
    private Subject updateSubject(@PathVariable Long subId, @RequestBody Subject subject) {
        return subjectServiceImp.update(subId , subject);
    }

    @DeleteMapping("{subId}")
    private String deleteSubject(@PathVariable Long subId) {
        subjectServiceImp.deleteById(subId);
        return "success";
    }
    @GetMapping
    private List<Subject> getAllSubjects() {
        return subjectServiceImp.getAll();
    }

    @GetMapping("{subId}")
    private Subject getSubjectById(@PathVariable Long subId) {
        return subjectServiceImp.getById(subId);
    }
}
