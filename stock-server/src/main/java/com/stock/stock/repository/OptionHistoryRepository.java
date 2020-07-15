package com.stock.stock.repository;

import com.stock.stock.entity.OptionHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface OptionHistoryRepository extends CrudRepository<OptionHistory, Integer> {

    @Query(value = "SELECT * FROM option_history WHERE user_id = :userId", nativeQuery = true)
    List<OptionHistory> findByUserId(long userId);
}
