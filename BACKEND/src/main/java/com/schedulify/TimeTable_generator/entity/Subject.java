package com.schedulify.TimeTable_generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "subjects")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false , unique = true)
    private String code;
    @Column(nullable = false)
    private Integer weeklyFrequency;
    @Column(nullable = false)
    private Boolean isLab;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}
