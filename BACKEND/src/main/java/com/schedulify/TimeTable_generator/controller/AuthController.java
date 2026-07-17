package com.schedulify.TimeTable_generator.controller;

import com.schedulify.TimeTable_generator.dto.auth.LoginRequest;
import com.schedulify.TimeTable_generator.dto.auth.LoginResponse;
import com.schedulify.TimeTable_generator.serviceImp.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}