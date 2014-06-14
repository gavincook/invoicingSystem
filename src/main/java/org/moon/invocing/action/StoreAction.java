package org.moon.invocing.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.moon.base.action.BaseAction;
import org.moon.core.orm.mybatis.Criteria;
import org.moon.core.orm.mybatis.criterion.Restrictions;
import org.moon.invocing.domain.Store;
import org.moon.invocing.repository.StoreRepository;
import org.moon.invocing.service.StoreService;
import org.moon.message.WebResponse;
import org.moon.pagination.Pager;
import org.moon.rbac.domain.annotation.MenuMapping;
import org.moon.rest.annotation.Get;
import org.moon.rest.annotation.Post;
import org.moon.support.spring.annotation.FormParam;
import org.moon.utils.ParamUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Gavin
 * @date Jun 15, 2014
 */
@Controller
@RequestMapping("/store")
public class StoreAction extends BaseAction {

	@Resource
	private StoreService storeService;
	@Resource
	private StoreRepository storeRepository;
	
	@RequestMapping("")
	@MenuMapping(code="management_2",name="商品管理",parentCode="management",url="/store")
	public ModelAndView showStore(){
		return new ModelAndView("pages/store/store");
	}
	
	@Get("/list")
	public @ResponseBody Pager getUsersData(HttpServletRequest request){
		Criteria criteria = ParamUtils.getParamsAsCerteria(request);
		criteria.add(Restrictions.eq("delete_flag", false));
		return  storeService.listForPage(criteria);
	}
	
	@Post("/update")
	public @ResponseBody WebResponse update(@FormParam("store")Store store){
		storeRepository.update(store);
		 return WebResponse.build();
	}
	
	@Post("/add")
	public @ResponseBody WebResponse add(@FormParam("store")Store store){
		storeRepository.save(store);
		return  WebResponse.build();
	}
	
	@Post("/check")
	public @ResponseBody WebResponse check(@RequestParam("name")String name){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("delete_flag", false)).add(Restrictions.eq("name", name));
		return  WebResponse.build().setResult(storeService.count(criteria)==0);
	}
	
	@Post("/get")
	public @ResponseBody WebResponse get(@RequestParam("name")String name){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("delete_flag", false)).add(Restrictions.eq("name", name));
		return  WebResponse.build().setResult(storeService.count(criteria)==0);
	}
	
	@Post("/delete")
	public @ResponseBody WebResponse delete(@RequestParam("ids")Long[] ids){
		storeService.delete(ids);
		return  WebResponse.build();
	}
}
