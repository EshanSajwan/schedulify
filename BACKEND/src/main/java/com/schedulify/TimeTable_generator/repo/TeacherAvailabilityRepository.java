package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.TeacherAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherAvailabilityRepository extends JpaRepository<TeacherAvailability,Long> {
}
