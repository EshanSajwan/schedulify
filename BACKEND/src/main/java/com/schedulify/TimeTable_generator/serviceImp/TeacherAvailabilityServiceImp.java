package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.dto.TeacherAvailabilityDTO;
import com.schedulify.TimeTable_generator.entity.TeacherAvailability;
import com.schedulify.TimeTable_generator.repo.TeacherAvailabilityRepository;
import com.schedulify.TimeTable_generator.repo.TeacherRepository;
import com.schedulify.TimeTable_generator.repo.TimeSlotsRepository;
import com.schedulify.TimeTable_generator.service.TeacherAvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherAvailabilityServiceImp implements TeacherAvailabilityService {
    private final TeacherAvailabilityRepository teacherAvailabilityRepository;
    private final TeacherRepository teacherRepository;
    private final TimeSlotsRepository  timeSlotsRepository;

    public void add(TeacherAvailabilityDTO teacherAvailabilityDTO) {

        TeacherAvailability teacherAvailability = new TeacherAvailability();

        teacherAvailability.setAvailable(teacherAvailabilityDTO.available());
        teacherAvailability.setTeacher(teacherRepository.findById(teacherAvailabilityDTO.teacherId()).orElseThrow());
        teacherAvailability.setTimeSlot(timeSlotsRepository.findById(teacherAvailabilityDTO.timeSlotId()).orElseThrow());

        teacherAvailabilityRepository.save(teacherAvailability);
    }

    public List<TeacherAvailability> getAll() {
        return teacherAvailabilityRepository.findAll();
    }

    @Override
    public void update(long tAvId, TeacherAvailabilityDTO teacherAvailabilityDTO) {
        TeacherAvailability tA = teacherAvailabilityRepository.findById(tAvId).orElseThrow();

        tA.setAvailable(teacherAvailabilityDTO.available());
        tA.setTeacher(teacherRepository.findById(teacherAvailabilityDTO.teacherId()).orElseThrow());
        tA.setTimeSlot(timeSlotsRepository.findById(teacherAvailabilityDTO.timeSlotId()).orElseThrow());

        teacherAvailabilityRepository.save(tA);
    }

    @Override
    public void delete(long tAvId) {
        teacherAvailabilityRepository.deleteById(tAvId);
    }
}
