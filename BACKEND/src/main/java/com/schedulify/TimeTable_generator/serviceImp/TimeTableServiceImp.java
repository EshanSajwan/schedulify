package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.dto.TimeTableRequest;
import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.entity.Room;
import com.schedulify.TimeTable_generator.entity.TeachingAssignment;
import com.schedulify.TimeTable_generator.entity.TimeSlot;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import com.schedulify.TimeTable_generator.mapper.TimeTableMapper;
import com.schedulify.TimeTable_generator.repo.RoomsRepository;
import com.schedulify.TimeTable_generator.repo.TeachingAssignmentRepository;
import com.schedulify.TimeTable_generator.repo.TimeSlotsRepository;
import com.schedulify.TimeTable_generator.repo.TimeTableEntryRepository;
import com.schedulify.TimeTable_generator.service.TimeTableService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeTableServiceImp implements TimeTableService {

    private final TeachingAssignmentRepository teachingAssignmentRepo;
    private final RoomsRepository roomsRepo;
    private final TimeSlotsRepository timeSlotsRepo;
    private final TimeTableMapper mapper;
    private final TimeTableEntryRepository timeTableEntryRepo;

    public TimeTableResponse create( TimeTableRequest timeTableRequest) {
        TeachingAssignment teachingAssignment =
                teachingAssignmentRepo.findById(timeTableRequest.teachingAssignmentId())
                .orElseThrow();
        Room room = roomsRepo.findById(timeTableRequest.roomId()).orElseThrow();
        TimeSlot timeSlot = timeSlotsRepo.findById(timeTableRequest.timeSlotId()).orElseThrow();
        TimeTableEntry entry = TimeTableEntry.builder()
                .teachingAssignment(teachingAssignment)
                .room(room)
                .timeSlot(timeSlot)
                .build();

        timeTableEntryRepo.save(entry);

        return mapper.generateTimeTableResponse(entry);
    }

    public List<TimeTableResponse> getAll() {

        return timeTableEntryRepo.findAll()
                .stream()
                .map(mapper::generateTimeTableResponse)
                .toList();
    }
}
