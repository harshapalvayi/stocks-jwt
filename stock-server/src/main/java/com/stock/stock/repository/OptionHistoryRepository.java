package com.stock.stock.repository;

import com.stock.stock.entity.OptionsHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface OptionHistoryRepository extends CrudRepository<OptionsHistory, Integer> {

    @Query(value = "SELECT * FROM Options_history WHERE option_id = :optionId AND user_id = :userId AND trade_date = TO_TIMESTAMP(:tradeDate,'YYYY-MM-DD')", nativeQuery = true)
    OptionsHistory findByOptionIdAndUserIdAndTradeDate(long optionId, long userId, String tradeDate);

    @Query(value = "SELECT * FROM Options_history WHERE user_id = :userId AND trade_date = TO_TIMESTAMP(:tradeDate,'YYYY-MM-DD')", nativeQuery = true)
    List<OptionsHistory> findByUserIdAndTradeDate(long userId, String tradeDate);

}
