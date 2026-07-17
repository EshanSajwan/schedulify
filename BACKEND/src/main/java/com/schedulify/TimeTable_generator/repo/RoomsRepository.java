package com.schedulify.TimeTable_generator.repo;

import com.schedulify.TimeTable_generator.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomsRepository extends JpaRepository<Room, Long> {
    void deleteByRoomNumber(Integer roomNo);
}
