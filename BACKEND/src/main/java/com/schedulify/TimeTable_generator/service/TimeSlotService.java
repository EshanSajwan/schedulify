package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.entity.TimeSlot;
import java.util.List;

public interface TimeSlotService {

    void add(TimeSlot timeSlot) ;

    List<TimeSlot> getAll();

    String update (long id , TimeSlot timeSlot) ;

    String delete(long id) ;
}
