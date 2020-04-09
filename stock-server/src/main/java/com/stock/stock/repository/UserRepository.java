package com.stock.stock.repository;

import com.stock.stock.model.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<Users, Integer> {

    Users findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
