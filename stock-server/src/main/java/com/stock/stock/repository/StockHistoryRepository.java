package com.stock.stock.repository;

import com.stock.stock.entity.StocksHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface StockHistoryRepository extends CrudRepository<StocksHistory, Integer> {

    @Query(value = "SELECT * FROM Stocks_history WHERE stock_id = :stockId AND user_id = :userId AND trade_date = TO_TIMESTAMP(:tradeDate,'YYYY-MM-DD')", nativeQuery = true)
    StocksHistory findByStockIdAndUserIdAndTradeDate(long stockId, long userId, String tradeDate);

    @Query(value = "SELECT * FROM Stocks_history WHERE user_id = :userId AND trade_date = TO_TIMESTAMP(:tradeDate,'YYYY-MM-DD')", nativeQuery = true)
    List<StocksHistory> findByUserIdAndTradeDate(long userId, String tradeDate);

}
