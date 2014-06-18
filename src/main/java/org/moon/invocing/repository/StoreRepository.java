package org.moon.invocing.repository;

import org.apache.ibatis.annotations.Param;
import org.moon.base.repository.BaseRepository;
import org.moon.invocing.domain.Store;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends BaseRepository<Store>{
	
	public void replenish(@Param("id")Long id,@Param("replenishNumber")Integer replenishNumber);
	
}
