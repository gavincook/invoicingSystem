<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<m:require src="common,ev,zt,js/ztree.extend.js,table,dialog,noty,font,{store/store}"></m:require>
<title>商品管理</title>
</head>
<body style="margin:0;">
<!-- 用户列表 -->
     <div id="storeTable"></div> 
     
     <!-- Modal -->
<form id="storeForm" style="display: none;">
  <div class="form-group">
  	<span class="label-text">商品名称:</span>
  	<input type="text" class="form-control" name="store.name" validate="validate[required,call(isStoreNameExists)]"/>
  </div>
    <div class="form-group">
  	<span class="label-text">商品单价:</span>
  	<input type="text" class="form-control" name="store.price" />
  </div>
    <div class="form-group">
  	<span class="label-text">商品数量:</span>
  	<input type="text" class="form-control" name="store.number"/>
  </div>
  <div class="form-group">
  	<span class="label-text">最大预定数量:</span>
  	<input type="text" class="form-control" name="store.maxnumber"/>
  </div>
</form>

<form id="replenishForm" style="display: none;">
  <div class="form-group">
  	<span class="label-text">商品名称:</span>
  	<input type="text" class="form-control" name="name" disabled/>
  </div>
  <div class="form-group">
  	<span class="label-text">需要增加的库存量:</span>
  	<input type="text" class="form-control" name="replenishNumber" validate="validate[required,number]"/>
  </div>
</form>
</body>
</html>