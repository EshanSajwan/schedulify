package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.entity.ClassGroup;
import com.schedulify.TimeTable_generator.repo.ClassGroupRepository;
import com.schedulify.TimeTable_generator.service.ClassGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassGroupServiceImp implements ClassGroupService {

    private final ClassGroupRepository classGroupRepository;

    public void add(ClassGroup classGroup) {
        classGroupRepository.save(classGroup);
    }

    public List<ClassGroup> getAll() {
        return classGroupRepository.findAll();
    }

    public void deleteById(long cgId) {
        classGroupRepository.deleteById(cgId);
    }

    public void update(long cgId, ClassGroup classGroup) {
        ClassGroup cg = classGroupRepository.findById(cgId).orElseThrow();
        cg.setName(classGroup.getName());
        cg.setStrength(classGroup.getStrength());
        classGroupRepository.save(cg);
    }

}
