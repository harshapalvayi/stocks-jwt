package com.stock.stock.repository;

import com.stock.stock.entity.ShareHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface ShareHistoryRepository extends CrudRepository<ShareHistory, Integer> {

    @Query(value = "SELECT * FROM share_history WHERE user_id = :userId", nativeQuery = true)
    List<ShareHistory> findByUserId(long userId);
}
