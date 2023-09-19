package com.study.forum.controllers;

import com.study.forum.dtos.UserSigninDTO;
import com.study.forum.dtos.UserSignupDTO;
import com.study.forum.enums.UserRole;
import com.study.forum.models.User;
import com.study.forum.repositories.UserRepository;
import com.study.forum.services.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/signup")
    private ResponseEntity<?> signUp(
            @Valid @RequestBody UserSignupDTO userSignupDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.findByUsername(userSignupDTO.getUsername()) != null) {
            response.put("message", "This user already exists");
            return ResponseEntity.badRequest().body(response);
        }

        User newUser = userSignupDTO.toUser();
        newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
        newUser.setRole(UserRole.ROLE_USER);

        userRepository.save(newUser);

        response.put("message", "User created successfully");
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/signin")
    private ResponseEntity<?> signin(
            @Valid @RequestBody UserSigninDTO userSigninDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        var authentication = new UsernamePasswordAuthenticationToken(userSigninDTO.getUsername(), userSigninDTO.getPassword());
        var auth = authenticationManager.authenticate(authentication);
        var token = jwtTokenService.generate((User) auth.getPrincipal());

        if (token == "") {
            response.put("message", "Invalid username or password");
            return ResponseEntity.ok().body(response);
        }

        response.put("message", "User founded successfully");
        response.put("data", token);
        return ResponseEntity.ok().body(response);
    }
}
