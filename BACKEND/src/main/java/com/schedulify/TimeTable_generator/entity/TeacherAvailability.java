package com.schedulify.TimeTable_generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TeacherAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Teacher teacher;
    @ManyToOne(optional = false)
    private TimeSlot timeSlot;
    @Column(nullable = false)
    private Boolean available;

}
