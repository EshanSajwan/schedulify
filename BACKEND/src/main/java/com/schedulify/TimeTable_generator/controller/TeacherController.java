package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.entity.Teacher;
import com.schedulify.TimeTable_generator.service.TeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/teacher")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;

    @PostMapping
    public Teacher createTeacher(@Valid @RequestBody Teacher teacher) {
        return  teacherService.createTeacher(teacher);
    }

    @PutMapping("{teacherId}")
    public Teacher updateTeacher(@Valid @PathVariable Long teacherId , @RequestBody Teacher teacher) {
        return teacherService.updateTeacher(teacherId , teacher);
    }

    @DeleteMapping("{teacherId}")
    public ResponseEntity<String> deleteTeacher(@Valid @PathVariable Long teacherId) {
        teacherService.deleteById(teacherId);
        return ResponseEntity.ok("Teacher has been deleted");
    }
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("{teacherId}")
    public Teacher getTeacherById(@PathVariable Long teacherId) {
        return teacherService.getTeacherById(teacherId);
    }

    @GetMapping("/me/timetable")
    public List<TimeTableResponse> getMyTimetable(Authentication authentication) {

        return teacherService.getMyTimetable(authentication.getName());

    }
}
