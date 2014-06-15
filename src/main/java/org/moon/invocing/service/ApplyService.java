package org.moon.invocing.service;

import javax.annotation.Resource;

import org.moon.base.service.AbstractService;
import org.moon.core.orm.mybatis.Criteria;
import org.moon.invocing.domain.Apply;
import org.moon.invocing.repository.ApplyRepository;
import org.moon.pagination.Pager;
import org.springframework.stereotype.Service;

@Service
public class ApplyService extends AbstractService<Apply>{

	@Resource
	private ApplyRepository applyRepository;
	@Override
	public Apply get(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pager listForPage(Criteria criteria){
		Pager pager = new Pager(applyRepository.count(getGeneric(), criteria),applyRepository.listData() , null);
		return pager;
	}
}
