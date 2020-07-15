package com.stock.stock.repository;

import com.stock.stock.entity.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<Users, Integer> {

    @Query(value = "SELECT * FROM Users WHERE user_id = :userId", nativeQuery = true)
    Users findByUserId(long userId);

    Users findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
