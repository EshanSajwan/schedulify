package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.dto.TeachingAssDTO;
import com.schedulify.TimeTable_generator.entity.TeachingAssignment;

import java.util.List;

public interface TeachingAssignmentService {

    TeachingAssignment add(TeachingAssDTO teachingAssDTO) ;

    List<TeachingAssignment> getAll();

    void update(long tAssId, TeachingAssDTO teachingAssDTO);

    void delete(long tAssId);
}
