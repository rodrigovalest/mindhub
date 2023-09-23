package com.study.forum.controllers;

import com.study.forum.dtos.comment.CommentRequestDTO;
import com.study.forum.dtos.comment.CommentResponseDTO;
import com.study.forum.dtos.post.PostRequestDTO;
import com.study.forum.dtos.post.PostResponseDTO;
import com.study.forum.models.Comment;
import com.study.forum.models.Post;
import com.study.forum.models.User;
import com.study.forum.repositories.CommentRepository;
import com.study.forum.repositories.PostRepository;
import com.study.forum.services.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping
    public ResponseEntity<?> save(
            @RequestHeader(value = "Authorization", required = true) String token,
            @Valid @RequestBody CommentRequestDTO commentRequestDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<Post> optionalPost = this.postRepository.findById(commentRequestDTO.getPostId());
        if (optionalPost.isEmpty()) {
            response.put("message", "Post not found");
            return ResponseEntity.badRequest().body(response);
        }
        Post post = optionalPost.get();

        User user = this.jwtTokenService.getUserByToken(token);

        Comment parentComment = null;
        if (commentRequestDTO.getParentCommentId() != null) {
            Optional<Comment> optionalParentComment = this.commentRepository.findById(commentRequestDTO.getParentCommentId());
            if (optionalParentComment.isEmpty()) {
                response.put("message", "Parent comment not found");
                return ResponseEntity.badRequest().body(response);
            }
            parentComment = optionalParentComment.get();
        }

        Comment newComment = new Comment();
        newComment.setUser(user);
        newComment.setPost(post);
        newComment.setParentComment(parentComment);
        newComment.setText(commentRequestDTO.getText());

        response.put("message", "New post succesfully saved");
        response.put("data", new CommentResponseDTO(this.commentRepository.save(newComment)));
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<?> findAllByPost(
            @RequestParam(name = "post") UUID postId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        List<Comment> commentList = this.commentRepository.findAllCommentsForPost(postId);
        List<CommentResponseDTO> commentResponseDTOList = new ArrayList<>(List.of());

        for (Comment comment : commentList) {
            CommentResponseDTO commentResponseDTO = new CommentResponseDTO(comment);
            commentResponseDTOList.add(commentResponseDTO);
        }

        response.put("message", "Success on find all comments by post");
        response.put("data", commentResponseDTOList);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<?> getOne(
            @PathVariable("commentId") UUID commentId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        Optional<Comment> optionalComment = this.commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            response.put("message", "Comment not found");
            return ResponseEntity.badRequest().body(response);
        }
        Comment comment = optionalComment.get();

        response.put("message", "Success on get one comment");
        response.put("data", new CommentResponseDTO(comment));
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> update(
            @RequestHeader(value = "Authorization", required = true) String token,
            @PathVariable("commentId") UUID commentId,
            @Valid @RequestBody CommentRequestDTO commentRequestDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<Post> optionalPost = this.postRepository.findById(commentRequestDTO.getPostId());
        if (optionalPost.isEmpty()) {
            response.put("message", "Post not found");
            return ResponseEntity.badRequest().body(response);
        }
        Post post = optionalPost.get();

        Comment parentComment = null;
        if (commentRequestDTO.getParentCommentId() != null) {
            Optional<Comment> optionalParentComment = this.commentRepository.findById(commentRequestDTO.getParentCommentId());
            if (optionalParentComment.isEmpty()) {
                response.put("message", "Parent comment not found");
                return ResponseEntity.badRequest().body(response);
            }
            parentComment = optionalParentComment.get();
        }

        Optional<Comment> optionalComment = this.commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            response.put("message", "Comment not found");
            return ResponseEntity.badRequest().body(response);
        }
        Comment comment = optionalComment.get();

        User user = this.jwtTokenService.getUserByToken(token);

        if (user.getId() != comment.getUser().getId()) {
            response.put("message", "Comment not found");
            return ResponseEntity.status(401).body(response);
        }

        comment.setPost(post);
        comment.setUser(user);
        comment.setText(commentRequestDTO.getText());

        if (commentRequestDTO.getParentCommentId() == null)
            comment.setParentComment(null);
        else
            comment.setParentComment(parentComment);

        this.commentRepository.save(comment);

        response.put("message", "Success on update comment");
        response.put("data", new CommentResponseDTO(comment));
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> delete(
            @PathVariable("commentId") UUID commentId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        Optional<Comment> optionalComment = this.commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            response.put("message", "Comment not found");
            return ResponseEntity.badRequest().body(response);
        }
        Comment comment = optionalComment.get();
        this.commentRepository.delete(comment);

        response.put("message", "Success on delete comment");
        return ResponseEntity.ok().body(response);
    }
}
