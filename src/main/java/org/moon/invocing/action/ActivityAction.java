package org.moon.invocing.action;

import java.util.List;

import javax.annotation.Resource;

import org.moon.base.action.BaseAction;
import org.moon.core.orm.mybatis.Criteria;
import org.moon.core.orm.mybatis.criterion.Restrictions;
import org.moon.invocing.domain.Activity;
import org.moon.invocing.repository.ActivityRepository;
import org.moon.message.WebResponse;
import org.moon.rbac.domain.annotation.MenuMapping;
import org.moon.rest.annotation.Post;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Gavin
 * @date Jun 17, 2014
 */
@Controller
@RequestMapping("/activity")
public class ActivityAction extends BaseAction {

	@Resource
	private ActivityRepository activityRepository;
	
	@RequestMapping("")
	@MenuMapping(code="management_5",name="申领批次",parentCode="management",url="/activity")
	public ModelAndView showStore(){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("status", 1));
		List list = activityRepository.list(Activity.class, criteria);
		return new ModelAndView("pages/activity/activity","running",list.size()>0);
	}
	
	
	@Post("/add")
	public @ResponseBody WebResponse add(){
		activityRepository.changeStatus();
		Activity activity = new Activity();
		activity.setName("");
		activity.setStatus(1);
		activityRepository.save(activity);
		return  WebResponse.build();
	}
	
	@Post("/stop")
	public @ResponseBody WebResponse stop(){
		activityRepository.changeStatus();
		return  WebResponse.build();
	}
	
	@Post("/list")
	public @ResponseBody WebResponse list(){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("status", 1));
		List list = activityRepository.list(Activity.class, criteria);
		return  WebResponse.build().setResult(list);
	}
}
