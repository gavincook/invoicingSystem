package org.moon.invocing.domain;

import javax.persistence.Table;

import org.moon.base.domain.BaseDomain;

import com.reeham.component.ddd.annotation.Model;

@Model
@Table(name="im_store")
public class Store extends BaseDomain{
	
	private static final long serialVersionUID = -944340852387557440L;

	private String name;

	private double price;
	
	private Integer number;
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}
	
	
}
