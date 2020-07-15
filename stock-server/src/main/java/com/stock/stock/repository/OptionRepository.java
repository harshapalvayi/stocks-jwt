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

    @Query(value = "SELECT * FROM options WHERE user_id = :userId and holding = true", nativeQuery = true)
    List<Options> findByUserId(long userId);

    @Query(value = "SELECT * FROM options WHERE ticker = :ticker", nativeQuery = true)
    Options findByTicker(String ticker);

    @Query(value = "SELECT * FROM options WHERE option_id = :optionId", nativeQuery = true)
    Options findByOptionId(long optionId);
}
