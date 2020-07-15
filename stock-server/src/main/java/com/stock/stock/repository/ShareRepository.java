package com.stock.stock.repository;

import com.stock.stock.entity.Share;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Transactional
@Repository
public interface ShareRepository  extends CrudRepository<Share, Integer> {

    @Query(value = "SELECT * FROM Share WHERE user_id = :userId AND holding = true", nativeQuery = true)
    List<Share> findByUserInfoAndHolding(long userId);

    @Query(value = "SELECT * FROM Share WHERE ticker = :ticker AND holding = true", nativeQuery = true)
    Share findByTicker(String ticker);

    @Query(value = "SELECT * FROM Share WHERE share_id = :shareId", nativeQuery = true)
    Share findByShareId(long shareId);

    boolean existsByTicker(String ticker);

    @Query(value = " SELECT * FROM Share s WHERE s.pay_date BETWEEN :startDate AND :endDate AND holding = true"
            , nativeQuery = true)
    List<Share> getMonthlyDividends(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
