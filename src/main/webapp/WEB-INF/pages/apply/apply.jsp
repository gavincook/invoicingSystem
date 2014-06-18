<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<m:require src="common,ev,zt,js/ztree.extend.js,table,dialog,noty,font,{apply/apply}"></m:require>
<style type="text/css">
	.form-group{
		height: 29px;
		margin-left:0px !important;
	}
</style>
<title>商品管理</title>
</head>
<body style="margin:0;">
	<c:if test="${running==true }">
		<form class="form-horizontal" id="applyForm" style="padding:15px;">
			<div class="form-group">
				<label class="col-sm-3 control-label no-padding-right"> 物品名称： </label>
				<div class="col-sm-9">
					<select class="col-xs-10 col-sm-5" name="apply.storeId">
						<c:forEach items="${stores}" var="s">
							<option value="${s.id }" data-number="${s.number }">
								${s.name}(${s.number })
							</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label no-padding-right" > 申领数量： </label>
				<div class="col-sm-9">
					<input type="text" name="apply.applyNumber" validate="validate[required,call(checkStore)]" placeholder="申领数量"class="col-xs-10 col-sm-5">
				</div>
			</div>
			<div class="clearfix">
				<div class="col-md-offset-3 col-md-9">
					<button class="btn btn-info" type="button" id="apply">
						<i class="icon-ok bigger-110"></i> 申领
					</button>
	
					&nbsp; &nbsp; &nbsp;
					<button class="btn" type="reset">
						<i class="icon-undo bigger-110"></i> 重置
					</button>
				</div>
			</div>
		</form>
	</c:if>
	
	<c:if test="${running==false}">
		申请还未开始，请耐心等待
	</c:if>
</body>
</html>