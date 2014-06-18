package org.moon.invocing.domain;

import javax.persistence.Table;

import org.moon.base.domain.BaseDomain;

import com.reeham.component.ddd.annotation.Model;

@Model
@Table(name="im_apply")
public class Apply extends BaseDomain{
	
	private static final long serialVersionUID = -944340852387557440L;
	
	private Long userId;
	
	private Long storeId;
	
	private Integer applyNumber;
	
	//现在作为activity的映射
	private Integer status;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public Integer getApplyNumber() {
		return applyNumber;
	}

	public void setApplyNumber(Integer applyNumber) {
		this.applyNumber = applyNumber;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
}
