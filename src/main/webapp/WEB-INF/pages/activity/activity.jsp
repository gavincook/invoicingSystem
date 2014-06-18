<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<m:require src="common,ev,zt,js/ztree.extend.js,table,dialog,noty,font"></m:require>
<script type="text/javascript">
	$(function(){
		$("#stop").click(function(){
			$.getJsonData(contextPath+"/activity/stop",{},{type:"Post"}).done(function(){
				 $.getJsonData(contextPath+"/activity",{},{dataType:'html',type:'Get'}).done(function(data){
						$(".main-content").html(data);
				 });
			});
		});
		
		$("#add").click(function(){
			$.getJsonData(contextPath+"/activity/add",{},{type:"Post"}).done(function(){
				 $.getJsonData(contextPath+"/activity",{},{dataType:'html',type:'Get'}).done(function(data){
						$(".main-content").html(data);
				 });
			});
		});
	});
</script>
<style type="text/css">
	.btn-cricle{
		-webkit-background-clip: border-box;
		-webkit-background-origin: padding-box;
		-webkit-background-size: auto;
		-webkit-box-shadow: none;
		-webkit-transition-duration: 0.3s;
		-webkit-transition-property: background;
		background-attachment: scroll;
		background-clip: border-box;
		background-color: rgb(0, 161, 203);
		background-image: none;
		background-origin: padding-box;
		background-size: auto;
		border-bottom-color: rgb(255, 255, 255);
		border-bottom-left-radius: 240px;
		border-bottom-right-radius: 240px;
		border-bottom-style: none;
		border-bottom-width: 0px;
		border-image-outset: 0px;
		border-image-repeat: stretch;
		border-image-slice: 100%;
		border-image-source: none;
		border-image-width: 1;
		border-left-color: rgb(255, 255, 255);
		border-left-style: none;
		border-left-width: 0px;
		border-right-color: rgb(255, 255, 255);
		border-right-style: none;
		border-right-width: 0px;
		border-top-color: rgb(255, 255, 255);
		border-top-left-radius: 240px;
		border-top-right-radius: 240px;
		border-top-style: none;
		border-top-width: 0px;
		box-shadow: none;
		color: rgb(255, 255, 255);
		cursor: auto;
		display: inline-block;
		font-family: 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
		font-size: 19px;
		font-weight: 300;
		height: 120px;
		line-height: 120px;
		margin-bottom: 0px;
		margin-left: 0px;
		margin-right: 0px;
		margin-top: 0px;
		padding-bottom: 0px;
		padding-left: 0px;
		padding-right: 0px;
		padding-top: 0px;
		text-align: center;
		text-decoration: none solid rgb(255, 255, 255);
		text-shadow: none;
		transition-duration: 0.3s;
		transition-property: background;
		vertical-align: middle;
		width: 120px;
		zoom: 1;
		outline: none;
		cursor: pointer;
		position: absolute;
		top: 200px;
		left: 50%;
	}
	
	.stop{
		backgroud:#EE7474!important;
	}
</style>
<title>商品管理</title>
</head>
<body style="margin:0;">
	<c:if test="${running==true}">
		<button type="button" class="btn btn-cricle btn-primary" id="stop">结束本轮申领</button>
	</c:if>
	<c:if test="${running==false}">
		<button type="button" class="btn btn-cricle  btn-primary" id="add">开启新一轮申领</button>
	</c:if>
</body>
</html>