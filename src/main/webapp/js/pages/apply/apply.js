

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
			        		 var _n=moon.success("<div style=\"font-size:35px;padding:10px;\">商品申领成功</div>");
			        		 console.log(_n);
			        		 $.getJsonData(contextPath+"/apply?_random="+Math.random(),{},{dataType:'html',type:'Get'}).done(function(data){
			        				$(".main-content").html(data);
			        				setTimeout(function(){
			        					 $("#"+_n.options.id).hide(1000,function(){
						        			 $("#noty_topCenter_layout_container").remove();
						        		 });
			        				},2000);
			        		 });
			        	 },
			        	 function(){moon.error("失败");}
			     );
			 }
		 });
	 
	});
	
	$("#query").click(function(){
		var params = table.opts.params;
		params["store_name"] = encodeURI($("[name='storeName']").val(),"UTF-8");
		params["user_name"] =  encodeURI($("[name='applyUser']").val(),"UTF-8");
		params["begin"]=$("[name='begin']").val()||'1900-01-01';
		params["end"]=$("[name='end']").val()||'2999-12-31';
		table.refresh();
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
		if(typeof(result)=="string"){
			dfd.resolve(result);
		}else{
			var number = result.result[0];
			var applied = result.extra||0;
			var maxnumber = number.maxnumber||0;
			number=number.number||0;
			if($applyNumber.val()>number){
				dfd.resolve("申请数量不能超过存库量 "+number+".<br/>");
			}else if($applyNumber.val()>maxnumber){
				dfd.resolve("申请数量不能超过最大预约量 "+maxnumber+".<br/>");
			}else if(applied+parseInt($applyNumber.val())>maxnumber&&$applyNumber.val()>0){
				dfd.resolve("已经申领 ："+applied+", 最多还能申领："+(maxnumber-applied)+"<br/>");
			}else{
				dfd.resolve("");
			}
		}
	});
	return dfd.promise();
}
