package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.entity.DashboardStats;
import com.schedulify.TimeTable_generator.repo.ClassGroupRepository;
import com.schedulify.TimeTable_generator.repo.RoomsRepository;
import com.schedulify.TimeTable_generator.repo.SubjectsRepository;
import com.schedulify.TimeTable_generator.repo.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/dashboard")
@CrossOrigin
public class DashboardController {

    private final TeacherRepository teacherRepo;
    private final SubjectsRepository subjectRepo;
    private final RoomsRepository roomRepo;
    private final ClassGroupRepository classGroupRepo;

    @GetMapping
    private DashboardStats stats()
    {
        return new DashboardStats(
                teacherRepo.count(),
                subjectRepo.count(),
                roomRepo.count(),
                classGroupRepo.count()
        );
    }
}
