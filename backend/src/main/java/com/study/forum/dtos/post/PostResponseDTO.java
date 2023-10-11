package com.study.forum.dtos.post;

import com.study.forum.models.Post;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostResponseDTO {

    private UUID id;
    private UUID userId;
    private String username;
    private String title;
    private String mdText;
    private String category;
    private LocalDateTime creationTimestamp;


    public PostResponseDTO(Post post) {
        this.id = post.getId();
        this.userId = post.getUser().getId();
        this.username = post.getUser().getUsername();
        this.title = post.getTitle();
        this.mdText = post.getMdText();
        this.category = post.getCategory().getDisplayCategory();
        this.creationTimestamp = post.getCreationTimestamp();
    }
}
