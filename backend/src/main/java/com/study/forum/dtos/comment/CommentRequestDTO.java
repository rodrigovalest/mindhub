package com.study.forum.dtos.comment;

import com.study.forum.models.Comment;
import com.study.forum.models.Post;
import com.study.forum.models.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentRequestDTO {

    @NotNull
    private UUID postId;

    private UUID parentCommentId;

    @NotBlank
    @NotNull
    private String mdText;
}
