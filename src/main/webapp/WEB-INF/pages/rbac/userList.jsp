<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<m:require src="common,ev,zt,js/ztree.extend.js,table,dialog,noty,font,{rbac/userList}"></m:require>
<title>用户管理</title>
</head>
<body style="margin:0;">
<!-- 用户列表 -->
     <div id="userTable"></div> 
     
     <!-- Modal -->
<form id="userForm" style="display: none;">
  <div class="form-group">
  	<span class="label-text">用户名:</span>
  	<input type="text" class="form-control" name="user.userName" validate="validate[required,call(isUserNameExists)]"/>
  </div>
  <div class="form-group">
  	<span class="label-text">密&nbsp;&nbsp;码:</span>
  	<input  class="form-control" type="password" name="user.password" id="password" validate="validate[minsize(6)]" errMsg="密码须6位以上">
  </div>
  <div class="form-group"> 
  	<span class="label-text">重复密码:</span>
  	<input  class="form-control" type="password" name="repassword" validate="validate[minsize(6),eq(#password)]">
  </div>
  <div class="form-group">
  	<span class="label-text">真实姓名:</span>
  	<input class="form-control" type="text" name="user.realName" validate="validate[required]"/>
  </div>
    <div class="form-group">
  	<span class="label-text">部门:</span>
  	<select name="user.departmentId">
  	<c:forEach items="${departments}" var="d">
  		<option value="${d.id}">
  			${d.name }
  		</option>
  	</c:forEach>
  	</select>
  </div>
</form>
     <!-- 角色分配 -->
     <div id="roleTree" class="ztree" style="display:none;">  </div>
    
</body>
</html>