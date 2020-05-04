package com.stock.stock.repository;


import com.stock.stock.model.Portfolio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface PortfolioRepository extends CrudRepository<Portfolio, Integer> {

    @Query(value = "SELECT * FROM Portfolio WHERE userId = :userId", nativeQuery = true)
    Portfolio findByUserId(long userId);
}
