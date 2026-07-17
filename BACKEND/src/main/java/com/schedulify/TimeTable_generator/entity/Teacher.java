package com.schedulify.TimeTable_generator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "teachers")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder // parameter ko flexibaly daalne kele
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank // validate karega insert krte time
    @Column(nullable = false)
    private String name;

    @Email // validate email before insert
    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String department;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
