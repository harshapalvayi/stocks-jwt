package com.stock.stock.repository;


import com.stock.stock.entity.Portfolio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface PortfolioRepository extends CrudRepository<Portfolio, Integer> {

    @Query(value = "SELECT * FROM Portfolio WHERE user_id = :userId", nativeQuery = true)
    Portfolio findByUserId(long userId);
}
