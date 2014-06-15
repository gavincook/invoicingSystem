<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<m:require src="common,ev,zt,js/ztree.extend.js,table,dialog,noty,font,{apply/apply}"></m:require>
<title>商品管理</title>
</head>
<body style="margin:0;">
<!-- 用户列表 -->
     <div id="applyTable"></div> 
     
     <!-- Modal -->
<form id="applyForm" style="display: none;">
  <div class="form-group">
  	<span class="label-text">商品名称:</span>
  	<input type="text" class="form-control" name="apply.name" validate="validate[required,call(isApplyNameExists)]"/>
  </div>
    <div class="form-group">
  	<span class="label-text">商品单价:</span>
  	<input type="text" class="form-control" name="apply.price" />
  </div>
    <div class="form-group">
  	<span class="label-text">商品数量:</span>
  	<input type="text" class="form-control" name="apply.number"/>
  </div>
</form>
</body>
</html>