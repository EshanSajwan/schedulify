package com.schedulify.TimeTable_generator.entity;

import com.schedulify.TimeTable_generator.enums.RoomType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rooms")
@Getter
@Setter
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false , unique = true)
    private Integer roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false )
    private RoomType roomType;

    @Column(nullable = false )
    private Integer roomCapacity;
}
