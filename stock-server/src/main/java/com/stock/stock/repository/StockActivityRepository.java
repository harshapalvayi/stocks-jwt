package com.stock.stock.repository;

import com.stock.stock.entity.StocksActivity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Transactional
@Repository
public interface StockActivityRepository extends CrudRepository<StocksActivity, Integer> {

    List<StocksActivity> findByUserId(long userId);

    List<StocksActivity> findByUserIdAndTicker(long userId, String ticker);

    @Query(value = "SELECT * FROM Stocks_activity WHERE user_id = :userId AND trade_date < TO_TIMESTAMP(:tradeDate,'YYYY-MM-DD')", nativeQuery = true)
    List<StocksActivity> findByUserIdAndUntilTradeDate(long userId, String tradeDate);

    @Query(value = "SELECT * FROM Stocks_activity WHERE user_id = :userId AND trade_date = TO_TIMESTAMP(:tradeDate,'YYYY-MM-DD')", nativeQuery = true)
    List<StocksActivity> findByUserIdAndTradeDate(long userId, String tradeDate);

    @Query(value = "select COALESCE(SUM(share_price * shares), 0)  from Stocks_activity where ticker = :ticker AND user_id = :userId AND action = 'Buy'"
            , nativeQuery = true)
    BigDecimal getShareBuyPrice(String ticker, long userId);

    @Query(value = "select COALESCE(SUM(share_price * shares), 0.0)  from Stocks_activity where user_id = :userId AND action = 'Buy'"
            , nativeQuery = true)
    BigDecimal getAllShares(long userId);

    @Query(value = "select COALESCE(SUM(share_price * shares), 0.0)  from Stocks_activity where ticker = :ticker AND user_id = :userId AND action = 'Sell'"
            , nativeQuery = true)
    BigDecimal getShareSellPrice(String ticker, long userId);

    @Query(value = "select COALESCE(SUM(shares), 0)  from Stocks_activity where ticker = :ticker AND user_id = :userId AND action = 'Buy'"
            , nativeQuery = true)
    BigDecimal getBuySharesByUserId(String ticker, long userId);

    @Query(value = "select COALESCE(SUM(shares), 0)  from Stocks_activity where ticker = :ticker AND user_id = :userId AND action = 'Sell'"
            , nativeQuery = true)
    BigDecimal getSellSharesByUserId(String ticker, long userId);
}
