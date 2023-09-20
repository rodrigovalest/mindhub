package com.study.forum.dtos.post;

import com.study.forum.enums.PostCategory;
import com.study.forum.models.Post;
import com.study.forum.models.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostRequestDTO {

    @NotBlank
    @NotNull
    private String title;

    @NotBlank
    @NotNull
    private String text;

    @NotNull
    private PostCategory category;

    public Post toPost() {
        Post post = new Post();
        post.setTitle(this.title);
        post.setText(this.text);
        post.setCategory(this.category);
        return post;
    }

    public Post toPost(User user) {
        Post post = new Post();
        post.setTitle(this.title);
        post.setText(this.text);
        post.setCategory(this.category);
        post.setUser(user);
        return post;
    }
}
