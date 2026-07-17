package com.schedulify.TimeTable_generator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "section")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ClassGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
    @Column(nullable = false)
    private Integer strength;
}
