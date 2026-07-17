package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.entity.Teacher;
import com.schedulify.TimeTable_generator.entity.TimeTableRun;
import com.schedulify.TimeTable_generator.entity.User;
import com.schedulify.TimeTable_generator.enums.Role;
import com.schedulify.TimeTable_generator.enums.RunStatus;
import com.schedulify.TimeTable_generator.mapper.TimeTableMapper;
import com.schedulify.TimeTable_generator.repo.TeacherRepository;
import com.schedulify.TimeTable_generator.repo.TimeTableEntryRepository;
import com.schedulify.TimeTable_generator.repo.TimeTableRunRepository;
import com.schedulify.TimeTable_generator.repo.UserRepository;
import com.schedulify.TimeTable_generator.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.schedulify.TimeTable_generator.dto.TimeTableResponse;

import java.util.List;

@Service
@RequiredArgsConstructor // isse kya hoga ki ye final fields ko ek tarah se inject karega @Autowired ke tarah but it is different kyoki @Autowired simple me kaam karti hai or final fieds kele ye use hota hai
public class TeacherServiceImp implements TeacherService {

    private final TeacherRepository teacherRepo;

    private final TimeTableEntryRepository entryRepo;

    private final TimeTableRunRepository runRepo;

    private final TimeTableMapper mapper;

    private final UserRepository userRepo;

    private final PasswordEncoder passwordEncoder;

    @Override
    public Teacher createTeacher(Teacher teacher) {

        User user = User.builder()
                .name(teacher.getName())
                .email(teacher.getEmail())
                .password(passwordEncoder.encode("teacher123"))
                .role(Role.TEACHER)
                .enabled(true)
                .build();

        user = userRepo.save(user);

        teacher.setUser(user);

        return teacherRepo.save(teacher);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepo.findAll();
    }

    @Override
    public Teacher updateTeacher(Long teacherId , Teacher teacher) {
        Teacher updateTeacher = teacherRepo.findById(teacherId)
                .orElseThrow();

        updateTeacher.setName(teacher.getName());
        updateTeacher.setDepartment(teacher.getDepartment());
        updateTeacher.setEmail(teacher.getEmail());

        return teacherRepo.save(updateTeacher);
    }

    @Override
    public void deleteById(Long teacherId) {
        teacherRepo.deleteById(teacherId);
    }

    @Override
    public Teacher getTeacherById(Long teacherId) {
        return teacherRepo.findById(teacherId).orElseThrow();
    }

    @Override
    public List<TimeTableResponse> getMyTimetable(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow();

        Teacher teacher = teacherRepo.findByUser(user)
                .orElseThrow();

        TimeTableRun activeRun = runRepo
                .findByStatus(RunStatus.ACTIVE)
                .orElseThrow();

        return entryRepo
                .findByTimeTableRunIdAndTeachingAssignmentTeacherId(
                        activeRun.getId(),
                        teacher.getId()
                )
                .stream()
                .map(mapper::generateTimeTableResponse)
                .toList();
    }
}
