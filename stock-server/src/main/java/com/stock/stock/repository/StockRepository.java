package com.stock.stock.repository;

import com.stock.stock.model.Stocks;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Transactional
@Repository
public interface StockRepository extends CrudRepository<Stocks, Long> {

     Stocks findBySymbol(String symbol);

     List<Stocks> findAllBy();

     @Query(value = "SELECT * FROM Stocks where user_id = :userId", nativeQuery = true)
     List<Stocks> findByUserId(long userId);

     @Modifying
     @Query("DELETE FROM Stocks where id = :id")
     void findById(@Param("id") long id);

     @Query(value = "SELECT sum(price * shares) FROM Stocks")
     double total();

     @Query(value = " SELECT * FROM Stocks WHERE pay_date between :startDate and :endDate", nativeQuery = true)
     List<Stocks> dividends(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
