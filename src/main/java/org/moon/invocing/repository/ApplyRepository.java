package org.moon.invocing.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.moon.base.repository.BaseRepository;
import org.moon.core.orm.mybatis.Criteria;
import org.moon.invocing.domain.Apply;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyRepository extends BaseRepository<Apply>{
	
	public List<Map<String, Object>> listData(@Param("criteria")Criteria criteria);

	public Integer countData(@Param("criteria")Criteria criteria);
	
	public void changeStatus(@Param("id")Long id,@Param("status")Integer status);
	
	public Integer checkRemaind(@Param("id")Long id);
	
	public void agree(@Param("id")Long id);
	
	public void grant(@Param("number")Integer number,@Param("storeId")Long storeId);
}
