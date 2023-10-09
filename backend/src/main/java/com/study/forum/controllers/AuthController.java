package com.study.forum.controllers;

import com.study.forum.dtos.user.UserResponseDTO;
import com.study.forum.dtos.user.UserSigninDTO;
import com.study.forum.dtos.user.UserSignupDTO;
import com.study.forum.enums.UserRole;
import com.study.forum.models.User;
import com.study.forum.repositories.UserRepository;
import com.study.forum.services.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserSignupDTO userSignupDTO, BindingResult bindingResult) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.findByUsername(userSignupDTO.getUsername()) != null) {
            response.put("message", "This username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.findByEmail(userSignupDTO.getEmail()) != null) {
            response.put("message", "This email is already being used");
            return ResponseEntity.badRequest().body(response);
        }

        User newUser = userSignupDTO.toUser();
        newUser.setPassword(this.passwordEncoder.encode(userSignupDTO.getPassword()));
        newUser.setRole(UserRole.ROLE_USER);

        userRepository.save(newUser);

        response.put("message", "User created successfully");
        return ResponseEntity.ok().body(response);
    }


    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody UserSigninDTO userSigninDTO, BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        UserDetails user = userRepository.findByUsername(userSigninDTO.getUsername());
        if (user == null || !this.passwordEncoder.matches(userSigninDTO.getPassword(), user.getPassword())) {
            response.put("message", "Invalid username or password");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            var authenticationToken = new UsernamePasswordAuthenticationToken(userSigninDTO.getUsername(), userSigninDTO.getPassword());
            var authentication = authenticationManager.authenticate(authenticationToken);
            var token = jwtTokenService.generate((User) authentication.getPrincipal());

            response.put("message", "User found successfully");
            response.put("data", token);
            return ResponseEntity.ok().body(response);
        } catch (AuthenticationException e) {
            response.put("message", "An internal error occurred");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader(value = "Authorization", required = true) String token) {
        Map<String, Object> response = new HashMap<>();

        if (Objects.equals(this.jwtTokenService.validate(token), "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "Valid token");
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/users")
    public ResponseEntity<?> findUserInfos(
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
}