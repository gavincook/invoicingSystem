<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<m:require src="common,ev,zt,js/ztree.extend.js,table,dialog,noty,font,{department/department}"></m:require>
<title>部门管理</title>
</head>
<body style="margin:0;">
<!-- 用户列表 -->
     <div id="departmentTable"></div> 
     
     <!-- Modal -->
<form id="departmentForm" style="display: none;">
  <div class="form-group">
  	<span class="label-text">部门名称:</span>
  	<input type="text" class="form-control" name="department.name" validate="validate[required,call(isDepartmentNameExists)]"/>
  </div>
</form>
</body>
</html>