package com.stock.stock.repository;

import com.stock.stock.model.Options;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface OptionRepository extends CrudRepository<Options, Integer> {

    @Query(value = "SELECT * FROM options WHERE userid = :userid and holding = true", nativeQuery = true)
    List<Options> findByUserId(long userid);

    @Query(value = "SELECT * FROM options WHERE ticker = :ticker", nativeQuery = true)
    Options findByTicker(String ticker);

    @Query(value = "SELECT * FROM options WHERE optionid = :optionid", nativeQuery = true)
    Options findByOptionid(long optionid);
}
