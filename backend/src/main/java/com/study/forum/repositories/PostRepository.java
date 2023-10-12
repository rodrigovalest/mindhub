package com.study.forum.repositories;

import com.study.forum.models.Post;
import com.study.forum.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByTitleContaining(String title);
    List<Post> findByUser(User user);
}
