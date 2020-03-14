package com.stock.stock.repository;

import com.stock.stock.model.StockDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface StockDetailRepository extends CrudRepository<StockDetails, Long> {

    StockDetails findByTicker(String ticker);

    List<StockDetails> findBy();

    boolean existsAllByTicker(String ticker);

}
