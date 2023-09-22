package com.study.forum.dtos.post;

import com.study.forum.models.Post;
import lombok.*;

import java.util.UUID;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostResponseDTO {

    private UUID id;
    private UUID userId;
    private String title;
    private String text;
    private String category;


    public PostResponseDTO(Post post) {
        this.id = post.getId();
        this.userId = post.getUser().getId();
        this.title = post.getTitle();
        this.text = post.getText();
        this.category = post.getCategory().getDisplayCategory();
    }
}
