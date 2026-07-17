package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.entity.Room;
import com.schedulify.TimeTable_generator.repo.RoomsRepository;
import com.schedulify.TimeTable_generator.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomsServiceImp implements RoomService {
    private final RoomsRepository roomsRepo;

    public void add(Room room) {
        roomsRepo.save(room);
    }

    public List<Room> getAll() {
        return roomsRepo.findAll();
    }

    @Override
    public Room updateRoom(Long roomId, Room room) {
        Room room1 = roomsRepo.findById(roomId).orElseThrow();
        room1.setRoomNumber(room.getRoomNumber());
        room1.setRoomCapacity(room.getRoomCapacity());
        room1.setRoomType(room.getRoomType());
        return roomsRepo.save(room1);
    }

    @Override
    public Room getRoomById(Long roomId) {
        return roomsRepo.findById(roomId).orElseThrow();
    }

    @Override
    @Transactional
    public void deleteById(Integer roomNo) {
        roomsRepo.deleteByRoomNumber(roomNo);
    }
}
