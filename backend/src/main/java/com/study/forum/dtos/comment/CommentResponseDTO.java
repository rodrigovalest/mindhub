package com.study.forum.dtos.comment;

import com.study.forum.models.Comment;
import lombok.*;

import java.util.UUID;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentResponseDTO {

    private UUID id;
    private UUID userId;
    private String username;
    private UUID postId;
    private UUID parentCommentId;
    private String text;

    public CommentResponseDTO(Comment comment) {
        this.id = comment.getId();
        this.userId = comment.getUser().getId();
        this.username = comment.getUser().getUsername();
        this.postId = comment.getPost().getId();
        this.text = comment.getText();

        if (comment.getParentComment() != null)
            this.parentCommentId = comment.getParentComment().getId();
        else
            this.parentCommentId = null;
    }
}
