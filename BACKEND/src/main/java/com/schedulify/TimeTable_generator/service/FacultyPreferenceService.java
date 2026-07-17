package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.dto.FacultyPreferenceDTO;
import com.schedulify.TimeTable_generator.entity.FacultyPreference;

import java.util.List;

public interface FacultyPreferenceService {

    public FacultyPreference add(FacultyPreferenceDTO facultyPreferenceDto) ;

    public List<FacultyPreference> getAll();

    void update(long fpId, FacultyPreferenceDTO facultyPreferenceDto);

    void delete(long fpId);
}
