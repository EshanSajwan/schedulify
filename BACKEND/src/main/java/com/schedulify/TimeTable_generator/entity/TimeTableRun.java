package com.schedulify.TimeTable_generator.entity;

import com.schedulify.TimeTable_generator.enums.RunStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "time_table_run")
public class TimeTableRun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime generatedAt;
    private String score;
    @Enumerated(EnumType.STRING)
    private RunStatus status;
}
