package com.study.forum.repositories;

import com.study.forum.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    @Query(value =
            "WITH RECURSIVE CommentHierarchy AS " +
                    "( " +
                    "  SELECT id, text, parent_comment_id, creation_timestamp, update_timestamp, post_id, user_id " +
                    "  FROM tb_comments " +
                    "  WHERE post_id = :postId AND parent_comment_id IS NULL " +
                    "  UNION ALL " +
                    "  SELECT c.id, c.text, c.parent_comment_id, c.creation_timestamp, c.update_timestamp, c.post_id, c.user_id" +
                    "  FROM CommentHierarchy ch " +
                    "  JOIN tb_comments c ON c.parent_comment_id = ch.id " +
                    ") " +
                    "SELECT * " +
                    "FROM CommentHierarchy " +
                    "ORDER BY creation_timestamp ASC",
            nativeQuery = true)
    List<Comment> findAllCommentsForPost(@Param("postId") UUID postId);
}
