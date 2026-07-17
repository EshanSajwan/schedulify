package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.FacultyPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyPreferenceRepository extends JpaRepository<FacultyPreference, Long> {
}
