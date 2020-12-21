package com.stock.stock.repository;

import com.stock.stock.entity.OptionsActivity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Transactional
@Repository
public interface OptionActivityRepository extends CrudRepository<OptionsActivity, Integer> {

    List<OptionsActivity> findByUserId(long userId);

    List<OptionsActivity> findByUserIdAndTicker(long userId, String ticker);

    @Query(value = "select COALESCE(SUM(action_price * contracts * 100), 0.0)  from Options_activity where ticker = :ticker AND user_id = :userId AND action = 'Buy'"
            , nativeQuery = true)
    BigDecimal getOptionBuyPrice(String ticker, long userId);

    @Query(value = "select COALESCE(SUM(action_price * contracts * 100), 0.0)  from Options_activity where user_id = :userId AND action = 'Buy'"
            , nativeQuery = true)
    BigDecimal getAllOptions(long userId);

    @Query(value = "select COALESCE(SUM(contracts * 100), 0.0)  from Options_activity where ticker = :ticker AND user_id = :userId AND action = 'Buy'"
            , nativeQuery = true)
    BigDecimal getBuyOptionsByUserId(String ticker, long userId);
}
