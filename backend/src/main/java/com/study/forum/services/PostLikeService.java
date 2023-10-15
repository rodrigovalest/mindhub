package com.study.forum.services;

import com.study.forum.models.Post;
import com.study.forum.repositories.PostLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PostLikeService {

    @Autowired
    private PostLikeRepository postLikeRepository;

    public Long countLikesBalanceByPost(Post post) {
        Long countLikes = this.postLikeRepository.countLikesByPostId(post.getId());
        Long countDislikes = this.postLikeRepository.countDislikesByPostId(post.getId());
        return (countLikes - countDislikes);
    }
}
