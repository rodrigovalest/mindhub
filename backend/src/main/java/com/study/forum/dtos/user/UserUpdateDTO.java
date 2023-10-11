package com.study.forum.dtos.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserUpdateDTO {
    @NotNull
    @NotBlank
    private String username;

    @NotNull
    @NotBlank
    private String email;
}
