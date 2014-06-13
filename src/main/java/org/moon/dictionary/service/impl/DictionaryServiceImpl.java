package org.moon.dictionary.service.impl;

import java.util.List;
import java.util.Map;

import org.moon.base.service.AbstractService;
import org.moon.dictionary.domain.Dictionary;
import org.moon.dictionary.service.DictionaryService;
import org.springframework.stereotype.Service;

@Service
public class DictionaryServiceImpl extends AbstractService<Dictionary> implements DictionaryService{

	@Override
	public Dictionary get(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String,Object>> list(){
		return super.list();
	}
	
}
