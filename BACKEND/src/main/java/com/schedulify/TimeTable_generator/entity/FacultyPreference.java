package com.schedulify.TimeTable_generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FacultyPreference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Teacher teacher;

    private Integer maxLecturesPerDay;
    private Boolean avoidConsecutiveLectures;
    private Boolean prefersLunchBreak;
}
