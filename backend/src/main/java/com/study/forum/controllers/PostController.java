package com.study.forum.controllers;

import com.study.forum.dtos.post.PostRequestDTO;
import com.study.forum.dtos.post.PostResponseDTO;
import com.study.forum.models.Post;
import com.study.forum.models.User;
import com.study.forum.repositories.PostRepository;
import com.study.forum.repositories.UserRepository;
import com.study.forum.services.JwtTokenService;
import com.study.forum.services.PostLikeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostLikeService postLikeService;

    @GetMapping
    public ResponseEntity<?> findAllPosts() throws Exception {
        Map<String, Object> response = new HashMap<>();

        List<Post> postList = this.postRepository.findAll();
        List<PostResponseDTO> postResponseDTOList = new ArrayList<>();

        for (Post post : postList) {
            PostResponseDTO postResponseDTO = new PostResponseDTO(post);
            postResponseDTO.setLikeBalance(this.postLikeService.countLikesBalanceByPost(post));
            postResponseDTOList.add(postResponseDTO);
        }

        response.put("message", "Success in finding all posts");
        response.put("data", postResponseDTOList);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/search")
    public ResponseEntity<?> findAllPostsByTitle(
            @RequestParam(name = "q") String postTitle
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (postTitle.isEmpty()) {
            response.put("message", "Post title param cannot be blank");
            return ResponseEntity.badRequest().body(response);
        }

        List<Post> postList = this.postRepository.findByTitleContaining(postTitle);
        List<PostResponseDTO> postResponseDTOList = new ArrayList<>();

        for (Post post : postList) {
            PostResponseDTO postResponseDTO = new PostResponseDTO(post);
            postResponseDTO.setLikeBalance(this.postLikeService.countLikesBalanceByPost(post));
            postResponseDTOList.add(postResponseDTO);
        }

        response.put("message", "Success in finding all posts");
        response.put("data", postResponseDTOList);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> savePost(
            @RequestHeader(value = "Authorization", required = true) String token,
            @Valid @RequestBody PostRequestDTO postRequestDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        User user = this.jwtTokenService.getUserByToken(token);
        Post newPost = postRequestDTO.toPost(user);

        PostResponseDTO postResponseDTO = new PostResponseDTO(this.postRepository.save(newPost));
        response.put("message", "New post succesfully saved");
        response.put("data", postResponseDTO);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> findPostById(
            @PathVariable("postId") UUID postId
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        Optional<Post> optionalPost = this.postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            response.put("message", "Post not found");
            return ResponseEntity.badRequest().body(response);
        }
        Post post = optionalPost.get();

        PostResponseDTO postResponseDTO = new PostResponseDTO(post);
        postResponseDTO.setLikeBalance(this.postLikeService.countLikesBalanceByPost(post));

        response.put("message", "Success in finding all posts");
        response.put("data", postResponseDTO);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<?> updatePost(
            @PathVariable("postId") UUID postId,
            @RequestHeader(value = "Authorization", required = true) String token,
            @Valid @RequestBody PostRequestDTO postRequestDTO,
            BindingResult bindingResult
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("message", "Invalid request body");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<Post> optionalPost = this.postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            response.put("message", "Post not found");
            return ResponseEntity.badRequest().body(response);
        }

        Post post = optionalPost.get();
        User user = this.jwtTokenService.getUserByToken(token);

        if (user != post.getUser()) {
            response.put("message", "Post not found");
            return ResponseEntity.badRequest().body(response);
        }

        post.setTitle(postRequestDTO.getTitle());
        post.setCategory(postRequestDTO.getCategory());
        post.setMdText(postRequestDTO.getMdText());
        this.postRepository.save(post);

        response.put("message", "Success on update post");
        response.put("data", new PostResponseDTO(post));
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(
            @PathVariable("postId") UUID postId,
            @RequestHeader(value = "Authorization", required = true) String token
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        Optional<Post> optionalPost = this.postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            response.put("message", "Post not found");
            return ResponseEntity.badRequest().body(response);
        }

        Post post = optionalPost.get();
        User user = this.jwtTokenService.getUserByToken(token);

        if (user != post.getUser()) {
            response.put("message", "Post not found");
            return ResponseEntity.badRequest().body(response);
        }

        this.postRepository.delete(post);

        response.put("message", "Success on delete post");
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<?> findPostsByUsername(
            @PathVariable("username") String username
    ) throws Exception {
        Map<String, Object> response = new HashMap<>();

        User user = (User) this.userRepository.findByUsername(username);

        List<Post> postList = this.postRepository.findByUser(user);
        List<PostResponseDTO> postResponseDTOList = new ArrayList<>();

        for (Post post : postList) {
            PostResponseDTO postResponseDTO = new PostResponseDTO(post);
            postResponseDTO.setLikeBalance(this.postLikeService.countLikesBalanceByPost(post));
            postResponseDTOList.add(postResponseDTO);
        }

        response.put("message", "Success in finding posts by username");
        response.put("data", postResponseDTOList);
        return ResponseEntity.ok().body(response);
    }
}