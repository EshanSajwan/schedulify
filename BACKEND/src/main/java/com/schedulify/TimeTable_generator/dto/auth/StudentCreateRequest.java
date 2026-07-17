package com.schedulify.TimeTable_generator.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentCreateRequest {

    private String name;

    private String email;

    private String password;

    private Long classGroupId;
}