package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.entity.Subject;
import com.schedulify.TimeTable_generator.repo.SubjectsRepository;
import com.schedulify.TimeTable_generator.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectServiceImp implements SubjectService {
    private final SubjectsRepository subjectsRepo;

    public void add(Subject subject) {
        subjectsRepo.save(subject);
    }

    public List<Subject> getAll() {
        return subjectsRepo.findAll();
    }

    @Override
    public void deleteById(Long subId) {
        subjectsRepo.deleteById(subId);
    }

    public Subject update(Long subId, Subject subject) {
        Subject subject1 = subjectsRepo.findById(subId).orElseThrow();
        subject1.setName(subject.getName());
        subject1.setCode(subject.getCode());
        subject1.setTeacher(subject.getTeacher());
        subject1.setIsLab(subject.getIsLab());
        subject1.setWeeklyFrequency(subject.getWeeklyFrequency());
        return subjectsRepo.save(subject1);
    }

    @Override
    public Subject getById(Long subId) {
        return  subjectsRepo.findById(subId).orElseThrow();
    }
}
