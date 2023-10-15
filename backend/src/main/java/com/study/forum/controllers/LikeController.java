package com.study.forum.controllers;

import com.study.forum.models.*;
import com.study.forum.repositories.*;
import com.study.forum.services.CommentLikeService;
import com.study.forum.services.JwtTokenService;
import com.study.forum.services.PostLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/likes")
public class LikeController {

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private CommentLikeService commentLikeService;

    @Autowired
    private PostLikeService postLikeService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenService jwtTokenService;


    @PutMapping("/comments/{commentId}")
    public ResponseEntity<?> updateCommentLikeCount(
        @RequestHeader(value = "Authorization", required = true) String token,
        @PathVariable("commentId") UUID commentId,
        @RequestParam(name = "type") Boolean likeType
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        String username = this.jwtTokenService.validate(token);
        if (Objects.equals(username, "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }
        User user = (User) this.userRepository.findByUsername(username);

        Optional<Comment> optionalComment = this.commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            response.put("message", "Inexistent comment");
            return ResponseEntity.badRequest().body(response);
        }
        Comment comment = optionalComment.get();

        Optional<CommentLike> optionalCommentLike = this.commentLikeRepository.findByCommentAndUser(comment, user);
        if (optionalCommentLike.isEmpty()) {
            CommentLike newCommentLike = new CommentLike();
            newCommentLike.setLikeType(likeType);
            newCommentLike.setComment(comment);
            newCommentLike.setUser(user);
            this.commentLikeRepository.save(newCommentLike);
        } else {
            CommentLike commentLike = optionalCommentLike.get();
            commentLike.setLikeType(likeType);
            this.commentLikeRepository.save(commentLike);
        }

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<?> updatePostLikeCount(
            @RequestHeader(value = "Authorization", required = true) String token,
            @PathVariable("postId") UUID postId,
            @RequestParam(name = "type") Boolean likeType
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        String username = this.jwtTokenService.validate(token);
        if (Objects.equals(username, "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }
        User user = (User) this.userRepository.findByUsername(username);

        Optional<Post> optionalPost = this.postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            response.put("message", "Inexistent post");
            return ResponseEntity.badRequest().body(response);
        }
        Post post = optionalPost.get();

        Optional<PostLike> optionalPostLike = this.postLikeRepository.findByPostAndUser(post, user);
        if (optionalPostLike.isEmpty()) {
            PostLike newPostLike = new PostLike();
            newPostLike.setLikeType(likeType);
            newPostLike.setPost(post);
            newPostLike.setUser(user);
            this.postLikeRepository.save(newPostLike);
        } else {
            PostLike postLike = optionalPostLike.get();
            postLike.setLikeType(likeType);
            this.postLikeRepository.save(postLike);
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<?> removeCommentLike(
            @RequestHeader(value = "Authorization", required = true) String token,
            @PathVariable("commentId") UUID commentId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        String username = this.jwtTokenService.validate(token);
        if (Objects.equals(username, "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }
        User user = (User) this.userRepository.findByUsername(username);

        Optional<Comment> optionalComment = this.commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            response.put("message", "Inexistent comment");
            return ResponseEntity.badRequest().body(response);
        }
        Comment comment = optionalComment.get();

        Optional<CommentLike> optionalCommentLike = this.commentLikeRepository.findByCommentAndUser(comment, user);
        if (optionalCommentLike.isEmpty()) {
            response.put("message", "Inexistent like comment");
            return ResponseEntity.badRequest().body(response);
        }

        CommentLike commentLike = optionalCommentLike.get();
        this.commentLikeRepository.delete(commentLike);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<?> removePostLike(
            @RequestHeader(value = "Authorization", required = true) String token,
            @PathVariable("postId") UUID postId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        String username = this.jwtTokenService.validate(token);
        if (Objects.equals(username, "")) {
            response.put("message", "Invalid token");
            return ResponseEntity.badRequest().body(response);
        }
        User user = (User) this.userRepository.findByUsername(username);

        Optional<Post> optionalPost = this.postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            response.put("message", "Inexistent post");
            return ResponseEntity.badRequest().body(response);
        }
        Post post = optionalPost.get();

        Optional<PostLike> optionalPostLike = this.postLikeRepository.findByPostAndUser(post, user);
        if (optionalPostLike.isEmpty()) {
            response.put("message", "Inexistent like post");
            return ResponseEntity.badRequest().body(response);
        }

        PostLike postLike = optionalPostLike.get();
        this.postLikeRepository.delete(postLike);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/comments/count/{commentId}")
    public ResponseEntity<?> getCommentLikeCount(
            @PathVariable("commentId") UUID commentId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        Optional<Comment> optionalComment = this.commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            response.put("message", "Inexistent comment");
            return ResponseEntity.badRequest().body(response);
        }
        Comment comment = optionalComment.get();

        response.put("data", this.commentLikeService.countLikesBalanceByComment(comment));
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/posts/count/{postId}")
    public ResponseEntity<?> getPostLikeCount(
            @PathVariable("postId") UUID postId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        Optional<Post> optionalPost = this.postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            response.put("message", "Inexistent post");
            return ResponseEntity.badRequest().body(response);
        }
        Post post = optionalPost.get();

        response.put("data", this.postLikeService.countLikesBalanceByPost(post));
        return ResponseEntity.ok().body(response);
    }
}
