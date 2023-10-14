package com.study.forum.repositories;

import com.study.forum.models.Post;
import com.study.forum.models.PostLike;
import com.study.forum.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PostLikeRepository extends JpaRepository<PostLike, UUID> {
    List<PostLike> findByPost(Post post);

    Optional<PostLike> findByPostAndUser(Post post, User user);

    @Query(value = "SELECT COUNT(*) FROM tb_posts_like WHERE post_id = :postId AND like_type = true", nativeQuery = true)
    Long countLikesByPostId(@Param("postId") UUID postId);

    @Query(value = "SELECT COUNT(*) FROM tb_posts_like WHERE post_id = :postId AND like_type = false", nativeQuery = true)
    Long countDislikesByPostId(@Param("postId") UUID postId);
}
