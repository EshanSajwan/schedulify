package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.dto.TeachingAssDTO;
import com.schedulify.TimeTable_generator.entity.*;
import com.schedulify.TimeTable_generator.repo.ClassGroupRepository;
import com.schedulify.TimeTable_generator.repo.SubjectsRepository;
import com.schedulify.TimeTable_generator.repo.TeacherRepository;
import com.schedulify.TimeTable_generator.repo.TeachingAssignmentRepository;
import com.schedulify.TimeTable_generator.service.TeachingAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeachingAssignmentServiceImp implements TeachingAssignmentService {

    private final TeacherRepository  teacherRepo;
    private final SubjectsRepository  subjectRepo;
    private final ClassGroupRepository  classGroupRepo;
    private  final TeachingAssignmentRepository teachingAssignmentRepo;

    public TeachingAssignment add(TeachingAssDTO teachingAssDTO) {
        Teacher teacher = teacherRepo.findById(teachingAssDTO.teacherId()).orElseThrow();
        Subject subject = subjectRepo.findById(teachingAssDTO.subjectId()).orElseThrow();
        ClassGroup classGroup = classGroupRepo.findById(teachingAssDTO.classGroupId()).orElseThrow();
        TeachingAssignment teachingAssignment = TeachingAssignment.builder()
                .teacher(teacher)
                .subject(subject)
                .classGroup(classGroup)
                .weeklyFrequency(teachingAssDTO.frequency())
                .build();
        return teachingAssignmentRepo.save(teachingAssignment);
    }

    public List<TeachingAssignment> getAll() {
        return teachingAssignmentRepo.findAll();
    }

    @Override
    public void update(long tAssId, TeachingAssDTO teachingAssDTO) {

            TeachingAssignment assignment = teachingAssignmentRepo.findById(tAssId)
                    .orElseThrow();

            assignment.setTeacher(
                    teacherRepo.findById(teachingAssDTO.teacherId()).orElseThrow());

            assignment.setSubject(
                    subjectRepo.findById(teachingAssDTO.subjectId()).orElseThrow());

            assignment.setClassGroup(
                    classGroupRepo.findById(teachingAssDTO.classGroupId()).orElseThrow());

            assignment.setWeeklyFrequency(teachingAssDTO.frequency());

            teachingAssignmentRepo.save(assignment);
    }

    @Override
    public void delete(long tAssId) {
        teachingAssignmentRepo.deleteById(tAssId);
    }
}
