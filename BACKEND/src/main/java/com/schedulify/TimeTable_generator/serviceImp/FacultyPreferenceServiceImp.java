package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.dto.FacultyPreferenceDTO;
import com.schedulify.TimeTable_generator.entity.FacultyPreference;
import com.schedulify.TimeTable_generator.entity.Teacher;
import com.schedulify.TimeTable_generator.repo.FacultyPreferenceRepository;
import com.schedulify.TimeTable_generator.repo.TeacherRepository;
import com.schedulify.TimeTable_generator.service.FacultyPreferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyPreferenceServiceImp implements FacultyPreferenceService {
    private final FacultyPreferenceRepository facultyPreferenceRepository;
    private final TeacherRepository teacherRepository;

    public FacultyPreference add(FacultyPreferenceDTO facultyPreferenceDto) {
        FacultyPreference facultyPreference = new FacultyPreference();

        facultyPreference.setMaxLecturesPerDay(facultyPreferenceDto.maxLecturesPerDay());
        facultyPreference.setTeacher(teacherRepository.findById(facultyPreferenceDto.teacherId()).orElseThrow());
        facultyPreference.setPrefersLunchBreak(facultyPreferenceDto.prefersLunchBreak());
        facultyPreference.setAvoidConsecutiveLectures(facultyPreferenceDto.avoidConsecutiveLectures());

        return facultyPreferenceRepository.save(facultyPreference);
    }

    public List<FacultyPreference> getAll() {
        return  facultyPreferenceRepository.findAll();
    }

    @Override
    public void update(long fpId, FacultyPreferenceDTO facultyPreferenceDto) {
        FacultyPreference fp = facultyPreferenceRepository.findById(fpId).orElseThrow();

        fp.setPrefersLunchBreak(facultyPreferenceDto.prefersLunchBreak());
        Teacher teacher = teacherRepository.findById(facultyPreferenceDto.teacherId()).orElseThrow();
        fp.setTeacher(teacher);
        fp.setAvoidConsecutiveLectures(facultyPreferenceDto.avoidConsecutiveLectures());
        fp.setMaxLecturesPerDay(facultyPreferenceDto.maxLecturesPerDay());

        facultyPreferenceRepository.save(fp);
    }

    @Override
    public void delete(long fpId) {
        facultyPreferenceRepository.deleteById(fpId);
    }
}
