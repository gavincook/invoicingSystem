package org.moon.invocing.action;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.moon.base.action.BaseAction;
import org.moon.core.orm.mybatis.Criteria;
import org.moon.core.orm.mybatis.criterion.MatchMode;
import org.moon.core.orm.mybatis.criterion.Restrictions;
import org.moon.invocing.domain.Activity;
import org.moon.invocing.domain.Apply;
import org.moon.invocing.repository.ActivityRepository;
import org.moon.invocing.repository.ApplyRepository;
import org.moon.invocing.service.ApplyService;
import org.moon.invocing.service.StoreService;
import org.moon.message.WebResponse;
import org.moon.pagination.Pager;
import org.moon.rbac.domain.User;
import org.moon.rbac.domain.annotation.MenuMapping;
import org.moon.rbac.service.UserService;
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
@RequestMapping("/apply")
public class ApplyAction extends BaseAction {

	@Resource
	private ApplyService applyService;
	@Resource
	private ApplyRepository applyRepository;
	@Resource
	private StoreService storeService;

	@Resource
	private UserService userService;
	
	@Resource
	private ActivityRepository activityRepository;
	
	
	@RequestMapping("")
	@MenuMapping(code="management_4",name="物品申领",parentCode="management",url="/apply")
	public ModelAndView showApply(){
		Criteria criteria1 = new Criteria();
		criteria1.add(Restrictions.eq("status", 1));
		List<Map<String,Object>> list = activityRepository.list(Activity.class, criteria1);
		return new ModelAndView("pages/apply/apply","stores",storeService.list()).addObject("running",list.size()>0);
	}
	
	@RequestMapping("/applyList")
	@MenuMapping(code="management_3",name="申领列表",parentCode="management",url="/apply/applyList")
	public ModelAndView showListPage(HttpServletRequest request){
		User currentUser = userService.getCurrentUser(request);
		if(currentUser.isAdmin()){
			return new ModelAndView("pages/apply/applyList");
		}else{
			return new ModelAndView("pages/apply/applyListForUser");
		}
	}
	
	@Get("/list")
	public @ResponseBody Pager list(HttpServletRequest request) throws UnsupportedEncodingException{
		Criteria criteria = ParamUtils.getParamsAsCerteria(request);
		criteria.add(Restrictions.eq("a.delete_flag", false));
		User currentUser = userService.getCurrentUser(request);
		if(currentUser.isAdmin()){
			if(request.getParameter("user_name")!=null){
				criteria.add(Restrictions.like("u.user_name",URLDecoder.decode(request.getParameter("user_name"),"UTF-8"),MatchMode.ANYWHERE));
			}
		}else{
			criteria.add(Restrictions.eq("u.user_name",currentUser.getUserName()));
		}
		if(request.getParameter("store_name")!=null){
			criteria.add(Restrictions.like("s.name", URLDecoder.decode(request.getParameter("store_name"),"UTF-8"),MatchMode.ANYWHERE));
		}
		if(request.getParameter("begin")!=null){
			criteria.add(Restrictions.ge("a.apply_date", request.getParameter("begin")+" 00:00:00"));
		}
		if(request.getParameter("end")!=null){
			criteria.add(Restrictions.le("a.apply_date", request.getParameter("end")+" 23:59:59"));
		}
		return  applyService.listForPage(criteria);
	}
	
	@Post("/update")
	public @ResponseBody WebResponse update(@FormParam("apply")Apply apply){
		applyRepository.update(apply);
		 return WebResponse.build();
	}
	
	@Post("/add")
	public @ResponseBody WebResponse add(@FormParam("apply")Apply apply,HttpServletRequest request){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("status", 1));
		List<Map<String,Object>> list = activityRepository.list(Activity.class, criteria);
		if(list.size()>0){
			apply.setStatus(Integer.parseInt(list.get(0).get("id")+""));
			apply.setUserId((Long) request.getSession().getAttribute(User.CURRENT_USER_ID));
			apply.setDeleteFlag(false);
			applyRepository.save(apply);
			applyRepository.grant(apply.getApplyNumber(),apply.getStoreId());
			return  WebResponse.build();
		}else{
			return  WebResponse.build().setResult("申领还未开始，请耐心等待.");
		}
		
		
	}
	
	@Post("/check")
	public @ResponseBody WebResponse check(@RequestParam("id")Long id,HttpServletRequest request){
		Criteria criteria1 = new Criteria();
		criteria1.add(Restrictions.eq("status", 1));
		List<Map<String,Object>> list = activityRepository.list(Activity.class, criteria1);
		if(list.size()==0){
			return WebResponse.build().setResult("申领还未开始，请耐心等待.");
		}
		
		Long userId = (Long) request.getSession().getAttribute(User.CURRENT_USER_ID);
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("delete_flag", false)).add(Restrictions.eq("id", id));
		return  WebResponse.build().setResult(storeService.list(criteria)).setExtra(applyRepository.sum(userId,id));
	}
	
	@Post("/get")
	public @ResponseBody WebResponse get(@RequestParam("name")String name){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("delete_flag", false)).add(Restrictions.eq("name", name));
		return  WebResponse.build().setResult(applyService.count(criteria)==0);
	}
	
	@Post("/delete")
	public @ResponseBody WebResponse delete(@RequestParam("ids")Long ids){
		applyService.delete(new Long[]{ids});
		return  WebResponse.build();
	}
	
	@Post("/changeStatus")
	public @ResponseBody WebResponse changeStatus(@RequestParam("id")Long id,@RequestParam("status")Integer status){
		if(status==1){
			if(applyRepository.checkRemaind(id)<0){
				return  WebResponse.build().setResult("库存不足,无法发放");
			}else{
				applyRepository.agree(id);
			}
		}
		applyRepository.changeStatus(id, status);
		return  WebResponse.build();
	}
	
}
