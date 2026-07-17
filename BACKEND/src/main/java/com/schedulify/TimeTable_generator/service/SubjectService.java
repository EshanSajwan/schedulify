package com.schedulify.TimeTable_generator.service;

import com.schedulify.TimeTable_generator.entity.Subject;
import java.util.List;

public interface SubjectService {

    void add(Subject subject) ;

    List<Subject> getAll() ;

    void deleteById(Long subId);

    Subject update(Long id, Subject subject);

    Subject getById(Long subId);
}
