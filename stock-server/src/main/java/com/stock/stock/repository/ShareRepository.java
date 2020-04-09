package com.stock.stock.repository;

import com.stock.stock.model.Share;
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

    @Query(value = "SELECT * FROM Share WHERE userid = :userid", nativeQuery = true)
    List<Share> findByUserId(long userid);

    @Query(value = "SELECT * FROM Share WHERE ticker = :ticker", nativeQuery = true)
    Share findByTicker(String ticker);

    @Query(value = "SELECT * FROM Share WHERE shareid = :shareid", nativeQuery = true)
    Share findByShareId(long shareid);

    boolean existsAllByTicker(String ticker);

    @Query(value = " SELECT * FROM Share s WHERE s.paydate BETWEEN :startDate AND :endDate"
            , nativeQuery = true)
    List<Share> getMonthlyDividends(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
