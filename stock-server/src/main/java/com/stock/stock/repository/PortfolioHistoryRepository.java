package com.stock.stock.repository;

import com.stock.stock.entity.PortfolioHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioHistoryRepository extends CrudRepository<PortfolioHistory, Integer> {

    @Query(value = "SELECT * FROM portfolio_history WHERE user_id = :userId", nativeQuery = true)
    List<PortfolioHistory> findByUserId(long userId);
}
