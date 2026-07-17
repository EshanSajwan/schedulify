package com.schedulify.TimeTable_generator.entity;

import com.schedulify.TimeTable_generator.enums.DayOfTheWeek;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Data
@Table(name = "time_slots")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DayOfTheWeek day;
    @Column(nullable = false)
    private LocalTime startTime;
    @Column(nullable = false)
    private LocalTime endTime;
}
