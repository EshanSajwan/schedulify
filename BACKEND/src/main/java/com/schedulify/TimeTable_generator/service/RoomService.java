package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.entity.Room;
import java.util.List;

public interface RoomService {

    void add(Room room);

    List<Room> getAll();

    Room updateRoom(Long roomId, Room room);

    Room getRoomById(Long roomId);

    void deleteById(Integer roomNo);
}
