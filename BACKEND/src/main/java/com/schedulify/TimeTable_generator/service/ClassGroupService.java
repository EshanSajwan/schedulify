package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.entity.ClassGroup;

import java.util.List;

public interface ClassGroupService {

    void add(ClassGroup classGroup);

    List<ClassGroup> getAll() ;

    void deleteById(long cgId);

    void update(long cgId, ClassGroup classGroup);
}
