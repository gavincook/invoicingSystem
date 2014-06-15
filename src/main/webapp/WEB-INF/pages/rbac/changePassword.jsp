<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<m:require src="common,ev,{rbac/changePassword}"></m:require>
<style type="text/css">
	.form-group{
		height: 29px;
		margin-left:0px !important;
	}
</style>
<title>修改密码</title>
</head>
<body>
	<c:if test="${info!=null}">
${info } 

</c:if>
	<c:if test="${info==null}">
		<form class="form-horizontal" style="padding:15px;">
			<div class="form-group">
				<label class="col-sm-3 control-label no-padding-right"> 原密码: </label>

				<div class="col-sm-9">
					<input name="oldPassword" id="oldPassword" type="password" validate="validate[call(checkOldPassword)]"
					msgalign="right" class="col-xs-10 col-sm-5"/>
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-sm-3 control-label no-padding-right">新密码： </label>

				<div class="col-sm-9">
					<input name="newPassword"
					id="newPassword" type="password" validate="validate[required]"
					msgalign="right" class="col-xs-10 col-sm-5"/>
				</div>
			</div>
			
			<div class="form-group">
				<label class="col-sm-3 control-label no-padding-right">确认密码： </label>

				<div class="col-sm-9">
					<input name="rePassword"
					type="password" validate="validate[required,eq(#newPassword)]"
					msgalign="right"  class="col-xs-10 col-sm-5"/>
				</div>
			</div>
			<div class="clearfix form-actions">
			<div class="col-md-offset-3 col-md-9">
				<button class="btn btn-info" type="button" id="confirm">
					<i class="icon-ok bigger-110"></i> 更改
				</button>
			</div>
		</form>
	</c:if>

</body>
</html>