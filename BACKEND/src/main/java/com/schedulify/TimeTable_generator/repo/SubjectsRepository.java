package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectsRepository extends JpaRepository<Subject, Long> {
}
