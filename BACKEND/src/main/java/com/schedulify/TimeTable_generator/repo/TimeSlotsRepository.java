package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeSlotsRepository extends JpaRepository<TimeSlot, Long> {
}
