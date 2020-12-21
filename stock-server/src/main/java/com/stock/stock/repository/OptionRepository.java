package com.stock.stock.repository;

import com.stock.stock.entity.Options;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface OptionRepository extends CrudRepository<Options, Integer> {

    @Query(value = " SELECT * FROM Options WHERE ticker = :ticker AND user_id = :userId"
            , nativeQuery = true)
    Options findByTickerAndUserId(String ticker, long userId);

    List<Options> findAllByHolding(boolean holding);

    @Query(value = " SELECT * FROM Options WHERE user_id = :userId AND holding = :holding"
            , nativeQuery = true)
    List<Options> findByUserIdAndHolding(long userId, boolean holding);

    @Query(value = " SELECT * FROM Options WHERE option_id = :optionId AND user_id = :userId"
            , nativeQuery = true)
    Options findByOptionIdAndUserId(long optionId, long userId);
}
