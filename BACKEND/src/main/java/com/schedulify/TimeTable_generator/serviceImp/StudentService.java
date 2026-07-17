package com.schedulify.TimeTable_generator.serviceImp;

import com.schedulify.TimeTable_generator.dto.TimeTableResponse;
import com.schedulify.TimeTable_generator.dto.auth.StudentCreateRequest;
import com.schedulify.TimeTable_generator.entity.ClassGroup;
import com.schedulify.TimeTable_generator.entity.TimeTableRun;
import com.schedulify.TimeTable_generator.entity.User;
import com.schedulify.TimeTable_generator.enums.Role;
import com.schedulify.TimeTable_generator.enums.RunStatus;
import com.schedulify.TimeTable_generator.mapper.TimeTableMapper;
import com.schedulify.TimeTable_generator.repo.ClassGroupRepository;
import com.schedulify.TimeTable_generator.repo.TimeTableEntryRepository;
import com.schedulify.TimeTable_generator.repo.TimeTableRunRepository;
import com.schedulify.TimeTable_generator.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final UserRepository userRepository;
    private final ClassGroupRepository classGroupRepository;
    private final PasswordEncoder passwordEncoder;

    private final TimeTableEntryRepository timeTableEntryRepo;
    private final TimeTableRunRepository timeTableRunRepo;
    private final TimeTableMapper timeTableMapper;

    @Transactional
    public void createStudent(StudentCreateRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        ClassGroup classGroup =
                classGroupRepository.findById(request.getClassGroupId())
                        .orElseThrow(() ->
                                new RuntimeException("Class group not found"));

        User student = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .enabled(true)
                .classGroup(classGroup)
                .build();

        userRepository.save(student);
    }

    public List<TimeTableResponse> getMyTimetable(String email) {

        User student = userRepository
                .findByEmail(email)
                .orElseThrow();

        Long classGroupId =
                student.getClassGroup().getId();

        TimeTableRun activeRun =
                timeTableRunRepo
                        .findByStatus(RunStatus.ACTIVE)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No active timetable found"
                                ));

        return timeTableEntryRepo
                .findByTimeTableRunId(activeRun.getId())
                .stream()
                .filter(entry ->
                        entry.getTeachingAssignment()
                                .getClassGroup()
                                .getId()
                                .equals(classGroupId)
                )
                .map(timeTableMapper::generateTimeTableResponse)
                .toList();
    }
}
