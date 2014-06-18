package org.moon.invocing.domain;

import javax.persistence.Table;

import org.moon.base.domain.BaseDomain;

import com.reeham.component.ddd.annotation.Model;

@Model
@Table(name="im_activity")
public class Activity extends BaseDomain{
	
	private static final long serialVersionUID = -944340852387557440L;

	private String name;

	private Integer status;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	
}
