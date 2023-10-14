package com.study.forum.repositories;

import com.study.forum.models.Comment;
import com.study.forum.models.CommentLike;
import com.study.forum.models.Post;
import com.study.forum.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommentLikeRepository extends JpaRepository<CommentLike, UUID>  {
    List<CommentLike> findByComment(Comment comment);

    Optional<CommentLike> findByCommentAndUser(Comment comment, User user);

    @Query(value = "SELECT COUNT(*) FROM tb_comments_like WHERE comment_id = :commentId AND like_type = true", nativeQuery = true)
    Long countLikesByCommentId(@Param("commentId") UUID commentId);

    @Query(value = "SELECT COUNT(*) FROM tb_comments_like WHERE comment_id = :commentId AND like_type = false", nativeQuery = true)
    Long countDislikesByCommentId(@Param("commentId") UUID commentId);
}
