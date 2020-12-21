package com.stock.stock.repository;

import com.stock.stock.entity.Stocks;
import com.stock.stock.entity.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Transactional
@Repository
public interface StockRepository extends CrudRepository<Stocks, Integer> {

    List<Stocks> findAllByHolding(boolean holding);

    boolean existsByTicker(String ticker);

    boolean existsByStockId(long stockId);

    @Query(value = " SELECT * FROM Stocks WHERE user_id = :userId AND holding = :holding"
            , nativeQuery = true)
    List<Stocks> findByUserIdAndHolding(long userId, boolean holding);

    @Query(value = " SELECT * FROM Stocks WHERE ticker = :ticker AND user_id = :userId AND holding = :holding"
            , nativeQuery = true)
    Stocks findByTickerAndUserIdAndHolding(String ticker, long userId, boolean holding);

    @Query(value = " SELECT * FROM Stocks WHERE ticker = :ticker AND user_id = :userId"
            , nativeQuery = true)
    Stocks findByTickerAndUserId(String ticker, long userId);

    @Query(value = " SELECT * FROM Stocks WHERE stock_id = :stockId AND user_id = :userId"
            , nativeQuery = true)
    Stocks findByStockIdAndUserId(long stockId, long userId);

    @Query(value = " SELECT * FROM Stocks s WHERE s.pay_date BETWEEN :startDate AND :endDate AND holding = true"
            , nativeQuery = true)
    List<Stocks> getMonthlyDividends(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
