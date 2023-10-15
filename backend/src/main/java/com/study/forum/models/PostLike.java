package com.study.forum.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TB_POSTS_LIKE")
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(name = "like_type", nullable = false)
    private Boolean likeType;

    @CreationTimestamp
    private LocalDateTime creationTimestamp;
}
