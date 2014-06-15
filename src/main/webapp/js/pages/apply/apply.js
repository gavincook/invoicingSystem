
var table;
$(function(){
	table = $("#applyTable").table({
		url:contextPath+"/apply/list",
		columns:[{name:"name",display:"商品名",sort:true},
				 {name:'apply_number',display:'申请数量',sort:true},
				 {name:'user_name',display:'申请人',sort:true,render:function(rowData){
					 return rowData.user_name||"系统管理员";
				 }},
				 {name:'apply_date',display:'申请日期',sort:true,render:function(rowData){
					 var date = new Date();
					 date.setTime(rowData.apply_date);
					 return date.getFullYear()+"-"+(date.getMonth()+1)+"-"
					 +date.getDate()+" "+date.getHours()+":"+date.getMinutes();
				 }},
				 {display:"操作",render:function(rowData){
					 if(rowData.status==0){
						 return "<div id=\"status_"+rowData.id+"\"><a href=\"#\"  onclick=\"agree("+rowData.id+")\">发放</a>&nbsp;&nbsp;"+
						 		"<a href=\"#\" onclick=\"disAgree("+rowData.id+")\">驳回</a></div>";
					 }else if(rowData.status==1){
						 return "已发放&nbsp;&nbsp;<a href=\"javascript:void(0)\" onclick=\"remove1("+rowData.id+")\">删除</a>&nbsp;&nbsp;";
					 }else{
						 return "已驳回&nbsp;&nbsp;<a href=\"javascript:void(0)\" onclick=\"remove1("+rowData.id+")\">删除</a>&nbsp;&nbsp;";
					 }
					 
				 }}],
		formatData:function(data){return data.items;},
		title:"申领列表",
		rowId:"id"
	});
	$("#applyForm").validate({align:'right',theme:"darkblue"});
	
	$("#apply").click(function(){
		 $("#applyForm").validate("validate").done(function(result){
			 if(result){
				 $("#applyForm").ajaxSubmitForm(contextPath+"/apply/add","",
       				 function(){
			        		 $("#applyForm").reset();
			        		 moon.success("商品申领成功");
			        	 },
			        	 function(){moon.error("失败");}
			     );
			 }
		 });
	 
	});
});
		

function agree(id){
	moon.confirm("确认发放?").done(function(flag){
		if(flag){
			moon.info("发放中,请稍后...");
			$.getJsonData(contextPath+"/apply/changeStatus",{id:id,status:1},{type:'Post'}).done(function(result){
				console.log(result);
				if(result.result){
					moon.error(result.result);
				}else{
					moon.success("发放成功");
					$("#status_"+id).html("已发放&nbsp;&nbsp;<a href=\"#\" onclick=\"remove("+id+")\">删除</a>&nbsp;&nbsp;");
				}
			});
		}
	});
}

function disAgree(id){
	moon.confirm("确认驳回?").done(function(flag){
		if(flag){
			moon.info("处理中,请稍后...");
			$.getJsonData(contextPath+"/apply/changeStatus",{id:id,status:2},{type:'Post'}).done(function(){
				moon.success("驳回成功");
				$("#status_"+id).html("已驳回&nbsp;&nbsp;<a href=\"#\" onclick=\"remove("+id+")\">删除</a>&nbsp;&nbsp;");
			});
		}
	});
}

function remove1(id){
	moon.confirm("确认删除?").done(function(flag){
		if(flag){
			$.getJsonData(contextPath+"/apply/delete",{ids:id},{type:'Post'}).done(function(){
				 table.refresh();
			});
		}
	});
}
 
function isApplyNameExists(field,type,opts){
	console.log(opts.model);
	if(opts.model=="update"){
		return "";
	}else{
		var dfd = $.Deferred();
		$.getJsonData(contextPath+"/apply/check",{name:field.val()},{type:"Post"}).done(function(result){
			if(result.result){
				dfd.resolve("");
			}else{
				dfd.resolve("商品已经存在.<br/>");
			}
		});
		return dfd.promise();
	}
}

function checkStore(){
	var dfd = $.Deferred();
	var $applyNumber = $("[name='apply.applyNumber']");
	$.getJsonData(contextPath+"/apply/check",{id:$("[name='apply.storeId']").val()},{type:"Post"}).done(function(result){
		var number = result.result[0];
		number=number.number||0;
		if($applyNumber.val()>number){
			dfd.resolve("申请数量不能超过存库量 "+number+".<br/>");
		}else{
			dfd.resolve("");
		}
	});
	return dfd.promise();
}
