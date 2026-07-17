package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.entity.TimeSlot;
import com.schedulify.TimeTable_generator.repo.TimeSlotsRepository;
import com.schedulify.TimeTable_generator.service.TimeSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeSlotServiceImp implements TimeSlotService {
    private final TimeSlotsRepository timeSlotsRepository;

    public void add(TimeSlot timeSlot) {
        timeSlotsRepository.save(timeSlot);
    }

    public List<TimeSlot> getAll() {
        return timeSlotsRepository.findAll();
    }

    @Override
    public String update(long id, TimeSlot timeSlot) {

        TimeSlot ts = timeSlotsRepository.findById(id).orElseThrow();
        ts.setDay(timeSlot.getDay());
        ts.setStartTime(timeSlot.getStartTime());
        ts.setEndTime(timeSlot.getEndTime());
        timeSlotsRepository.save(ts);

        return "success";
    }

    @Override
    public String delete(long id) {
        timeSlotsRepository.deleteById(id);
        return "success";
    }
}
