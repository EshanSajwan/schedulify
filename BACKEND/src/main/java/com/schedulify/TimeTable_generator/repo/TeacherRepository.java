package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.schedulify.TimeTable_generator.entity.User;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByUser(User user);

    Optional<Teacher> findByUserEmail(String email);
}
