package com.schedulify.TimeTable_generator.config;


import com.schedulify.TimeTable_generator.entity.User;
import com.schedulify.TimeTable_generator.enums.Role;
import com.schedulify.TimeTable_generator.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initAdmin() {

        return args -> {

            if (userRepository.findByEmail("admin@schedulify.com").isEmpty()) {

                User admin = User.builder()
                        .name("Administrator")
                        .email("admin@schedulify.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .enabled(true)
                        .build();

                userRepository.save(admin);

                System.out.println("✅ Admin user created.");
            }

        };
    }
}