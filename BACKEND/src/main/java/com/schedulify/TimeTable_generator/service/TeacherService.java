package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.entity.Teacher;
import jakarta.validation.Valid;

import java.util.List;

public interface TeacherService {

    Teacher createTeacher(Teacher teacher);

    List<Teacher> getAllTeachers();

    Teacher updateTeacher(Long  teacherId , Teacher teacher);

    void deleteById(@Valid Long teacherId);

    Teacher getTeacherById(Long teacherId);

    List<TimeTableResponse> getMyTimetable(String email);

}
