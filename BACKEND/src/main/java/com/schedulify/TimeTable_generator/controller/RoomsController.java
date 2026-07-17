package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.entity.Room;
import com.schedulify.TimeTable_generator.serviceImp.RoomsServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/rooms")
public class RoomsController {
    private final RoomsServiceImp roomsServiceImp;

    @PostMapping
    private String addRoom(@RequestBody Room room) {
        roomsServiceImp.add(room);
        return "Rooms added successfully";
    }

    @PutMapping("{roomId}")
    private Room updateRoom(@PathVariable Long roomId, @RequestBody Room room) {
        return roomsServiceImp.updateRoom(roomId , room);
    }

    @DeleteMapping("{roomNo}")
    private String deleteRoom(@PathVariable Integer roomNo) {
        roomsServiceImp.deleteById(roomNo);
        return  "Rooms deleted successfully";
    }

    @GetMapping("{roomId}")
    private Room getRoomById(@PathVariable Long roomId) {
        return roomsServiceImp.getRoomById(roomId);
    }
    @GetMapping
    private List<Room> getAllRooms(){
        return roomsServiceImp.getAll();
    }

}
