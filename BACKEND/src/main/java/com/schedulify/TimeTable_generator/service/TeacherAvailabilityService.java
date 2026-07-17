package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.dto.TeacherAvailabilityDTO;
import com.schedulify.TimeTable_generator.entity.TeacherAvailability;

import java.util.List;

public interface TeacherAvailabilityService {

    void add(TeacherAvailabilityDTO teacherAvailabilityDTO);

    List<TeacherAvailability> getAll();

    void update(long tAssId, TeacherAvailabilityDTO teacherAvailabilityDTO);

    void delete(long tAvId);
}
