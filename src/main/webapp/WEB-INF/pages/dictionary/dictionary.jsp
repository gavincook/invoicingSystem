<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<title>数据字典</title>
	<m:require src="common,noty,font,table,ev,dialog,{dictionary/dictionary}"></m:require>
</head>

<body>
	<div id="dictionaryTable"></div>
	
	<!-- 字典项表单 -->
	<form id="dictionaryForm" style="display:none">
		<div>
			<span class="label-text">字典代码:</span> 
			<input type="text" name="dictionary.code" validate="validate[required]"/>
		</div>
		<div>
			<span class="label-text">字典名称:</span> 
			<input type="text" name="dictionary.name" validate="validate[required]"/>
		</div>
	</form>
	
	<!-- 字典参数表单 -->
	<form id="dictionaryParamForm" style="display:none">
		<div>
			<span class="label-text">字典参数名称:</span> 
			<input type="text" name="dictionary.name" validate="validate[required]"/>
		</div>
		<div>
			<span class="label-text">字典参数值:</span> 
			<input type="text" name="dictionary.code" validate="validate[required]"/>
		</div>
	</form>
</body>
</html>