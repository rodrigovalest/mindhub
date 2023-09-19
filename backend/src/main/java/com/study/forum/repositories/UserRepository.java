package com.study.forum.repositories;

import com.study.forum.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Boolean existsByUsernameAndPassword(String username, String password);
    UserDetails findByUsername(String username);
}
