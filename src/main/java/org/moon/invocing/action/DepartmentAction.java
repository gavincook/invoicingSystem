package org.moon.invocing.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.moon.base.action.BaseAction;
import org.moon.core.orm.mybatis.Criteria;
import org.moon.core.orm.mybatis.criterion.Restrictions;
import org.moon.invocing.domain.Department;
import org.moon.invocing.repository.DepartmentRepository;
import org.moon.invocing.service.DepartmentService;
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
 * @date Jun 13, 2014
 */
@Controller
@RequestMapping("/department")
public class DepartmentAction extends BaseAction {

	@Resource
	private DepartmentService departmentService;
	@Resource
	private DepartmentRepository departmentRepository;
	
	@RequestMapping("")
	@MenuMapping(code="management_1",name="部门管理",parentCode="management",url="/department")
	public ModelAndView showDepartment(){
		return new ModelAndView("pages/department/department");
	}
	
	@Get("/list")
	public @ResponseBody Pager getUsersData(HttpServletRequest request){
		Criteria criteria = ParamUtils.getParamsAsCerteria(request);
		criteria.add(Restrictions.eq("delete_flag", false));
		return  departmentService.listForPage(criteria);
	}
	
	@Post("/update")
	public @ResponseBody WebResponse update(@FormParam("department")Department department){
		 departmentRepository.update(department);
		 return WebResponse.build();
	}
	
	@Post("/add")
	public @ResponseBody WebResponse add(@FormParam("department")Department department){
		departmentRepository.save(department);
		return  WebResponse.build();
	}
	
	@Post("/check")
	public @ResponseBody WebResponse check(@RequestParam("name")String name){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("delete_flag", false)).add(Restrictions.eq("name", name));
		return  WebResponse.build().setResult(departmentService.count(criteria)==0);
	}
	
	@Post("/get")
	public @ResponseBody WebResponse get(@RequestParam("name")String name){
		Criteria criteria = new Criteria();
		criteria.add(Restrictions.eq("delete_flag", false)).add(Restrictions.eq("name", name));
		return  WebResponse.build().setResult(departmentService.count(criteria)==0);
	}
	
	@Post("/delete")
	public @ResponseBody WebResponse delete(@RequestParam("ids")Long[] ids){
		departmentService.delete(ids);
		return  WebResponse.build();
	}
}
