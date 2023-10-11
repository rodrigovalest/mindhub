package com.study.forum.controllers;

import com.study.forum.dtos.user.UserResponseDTO;
import com.study.forum.dtos.user.UserUpdateDTO;
import com.study.forum.dtos.user.UserUpdatePasswordDTO;
import com.study.forum.models.User;
import com.study.forum.repositories.UserRepository;
import com.study.forum.services.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> findUserByToken(
            @RequestHeader(value = "Authorization", required = true) String token
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        String username = this.jwtTokenService.validate(token);
        if (Objects.equals(username, "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }
        User user = (User) this.userRepository.findByUsername(username);

        UserResponseDTO userResponseDTO = new UserResponseDTO(user);
        response.put("message", "Success on find user");
        response.put("data", userResponseDTO);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/change")
    public ResponseEntity<?> changeUsernameAndEmail(
            @RequestHeader(value = "Authorization", required = true) String token,
            @Valid @RequestBody UserUpdateDTO userUpdateDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        String username = this.jwtTokenService.validate(token);
        if (Objects.equals(username, "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }
        User user = (User) this.userRepository.findByUsername(username);

        if (this.userRepository.findByUsername(userUpdateDTO.getNewUsername()) != null
            && !userUpdateDTO.getNewUsername().equals(user.getUsername())) {
            response.put("message", "This username is already been used");
            return ResponseEntity.badRequest().body(response);
        }

        if (this.userRepository.findByUsername(userUpdateDTO.getNewEmail()) != null
            && !userUpdateDTO.getNewEmail().equals(user.getEmail())) {
            response.put("message", "This email is already been used");
            return ResponseEntity.badRequest().body(response);
        }

        user.setUsername(userUpdateDTO.getNewUsername());
        user.setEmail(userUpdateDTO.getNewEmail());

        UserResponseDTO userResponseDTO = new UserResponseDTO(this.userRepository.save(user));

        response.put("message", "Success on change username and email");
        response.put("data", userResponseDTO);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/change/password")
    public ResponseEntity<?> changePassword(
            @RequestHeader(value = "Authorization", required = true) String token,
            @Valid @RequestBody UserUpdatePasswordDTO userUpdatePasswordDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        String username = this.jwtTokenService.validate(token);
        if (Objects.equals(username, "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }
        User user = (User) this.userRepository.findByUsername(username);

        if (!passwordEncoder.matches(userUpdatePasswordDTO.getOldPassword(), user.getPassword())) {
            response.put("message", "Invalid old password");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPassword(this.passwordEncoder.encode(userUpdatePasswordDTO.getNewPassword()));
        this.userRepository.save(user);

        response.put("message", "Success on change password");
        return ResponseEntity.ok().body(response);
    }
}
