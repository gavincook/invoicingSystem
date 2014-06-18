package org.moon.invocing.repository;

import org.moon.base.repository.BaseRepository;
import org.moon.invocing.domain.Activity;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends BaseRepository<Activity>{
	
	public void changeStatus();
	
}
