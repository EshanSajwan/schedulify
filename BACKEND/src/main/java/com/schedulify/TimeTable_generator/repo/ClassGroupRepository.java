package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.ClassGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassGroupRepository extends JpaRepository<ClassGroup, Long> {
}
