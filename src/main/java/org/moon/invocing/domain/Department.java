package org.moon.invocing.domain;

import javax.persistence.Table;

import org.moon.base.domain.BaseDomain;

import com.reeham.component.ddd.annotation.Model;

@Model
@Table(name="im_department")
public class Department extends BaseDomain{
	
	private static final long serialVersionUID = -944340852387557440L;

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
