package com.study.forum.dtos.user;

import com.study.forum.models.User;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponseDTO {
    private String username;
    private String email;

    public UserResponseDTO(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}