package com.study.forum.services;

import com.study.forum.models.Comment;
import com.study.forum.repositories.CommentLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CommentLikeService {

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    public Long countLikesBalanceByComment(Comment comment) {
        Long countLikes = this.commentLikeRepository.countLikesByCommentId(comment.getId());
        Long countDislikes = this.commentLikeRepository.countDislikesByCommentId(comment.getId());
        return (countLikes - countDislikes);
    }
}
