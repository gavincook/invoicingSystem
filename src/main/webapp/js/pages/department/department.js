
var table;
$(function(){
	table = $("#departmentTable").table({
		url:contextPath+"/department/list",
		columns:[{name:"id"},{name:"name",display:"用户名"}],
		formatData:function(data){return data.items;},
		title:"部门列表",
		rowId:"id",
		buttons:[
		         {
		        	 text:"增加部门",
		        	 click:btnHandler,
		        	 name:'addBtn'
		         },
		         {
		        	 text:"编辑",
		        	 click:btnHandler,
		        	 name:'editBtn'
				 },
				 {
					 text:"删除",
					 click:btnHandler,
					 name:'deleteBtn'
				 }
		         ]
	});
	


});
		
var temp = [];
function btnHandler(btnTest){
	btnTest = btnTest.name;
	if(btnTest=='addBtn'){//添加
		$('#departmentForm').reset();
		$('#departmentForm').dialog({
			title:"添加一个部门",
			afterShown:function(){
				$("#departmentForm").validate({align:'right',theme:"darkblue"});
			},
			beforeClose:function(){
				$("#departmentForm").validate("hide");
			},
			buttons:[
			         {
			        	 text : "保存",
			        	 css  : "btn btn-primary",
			        	 click:function(){
			        		 $("#departmentForm").validate("validate").done(function(result){
			        			 if(result){
			        				 $("#departmentForm").ajaxSubmitForm(contextPath+"/department/add","",
					        				 function(){
					 			        		 $("#departmentForm").dialog("close");
					 			        		 $("#departmentTable").table("refresh");
					 			        		 $("#departmentForm").reset();
					 			        		 moon.success("部门添加成功");
					 			        	 },
					 			        	 function(){moon.error("失败");}
					 			     );
			        			 }
			        		 });
			        	 }
			         },
			         {
			        	 text  : "取消",
			        	 css   : "btn",
			        	 click : function(){
			        		 $("#departmentForm").dialog("close");
			        	 }
			         }
			         ]
		});
	}else if(btnTest=='editBtn'){//编辑 
		var selectRows = table.getSelect();
		if(selectRows.length!=1){
			moon.warn("请选中一条数据进行编辑.");
			return false;
		}
		var id = selectRows[0].id;
		var name = selectRows[0].name;
		$(":text","#departmentForm").val(name);
		$('#departmentForm').dialog({
			title:"编辑部门",
			afterShown:function(){
				$("#departmentForm").validate({align:'right',theme:"darkblue",model:"update"});
			},
			beforeClose:function(){
				$("#departmentForm").validate("hide");
			},
			buttons:[
			         {
			        	 text : "保存",
			        	 css  : "btn btn-primary",
			        	 click:function(){
			        		 $("#departmentForm").validate("validate").done(function(result){
			        			 if(result){
					        		 $("#departmentForm").ajaxSubmitForm(contextPath+"/department/update",
						        			 {"department.id":id},
					        				 function(){
					 			        		 $("#departmentForm").dialog("close");
					 			        		 table.refresh();
					 			        		 $("#departmentForm").reset();
					 			        		 moon.success("修改部门成功");
					 			        	 },
					 			        	 function(){moon.error("失败");}
					 			     );
			        			 }
			        		 });
			        	 }
			         },
			         {
			        	 text  : "取消",
			        	 css   : "btn",
			        	 click : function(){
			        		 $("#departmentForm").dialog("close");
			        	 }
			         }
			         ]
		});
	}else if(btnTest=='deleteBtn'){//删除数据
		var selectRows =  table.getSelect();
		if(selectRows.length<1){
			moon.warn("请选择要删除的数据");
			return false;
		}
		if(confirm("确认删除这"+selectRows.length+"条数据?")){
		   var ids="";
		   $.each(selectRows,function(index,e){
			   ids+="&ids="+e.id;
		   });
		   ids = ids.substring(1);
		   $.post(contextPath+"/department/delete",ids,function(result){
			   table.refresh();
		  });
		}
	}
};

var i= 1;
var ztree;
var znodes = [{name:'角色管理',id:-1,isParent:true}];

var setting = {
        data: {  
            simpleData: {  
                enable: true  
            }  
        },
		async: {
			enable: true,
			url:contextPath+"/role/getRoleData",
			autoParam:["id"],
			dataType:'json',
			dataFilter: filter
		},
		callback:{
			onAsyncSuccess :function(){
				i = ztree.selectNodebyTreepath("uid",temp,i);
			},
			onExpand : function(){
				i = ztree.selectNodebyTreepath("uid",temp,i);
			}
		}
}; 

function filter(treeId, parentNode, childNodes) {
	if (!childNodes) 
		{
		return null;
		}
	for (var i=0, l=childNodes.length; i<l; i++) {
		childNodes[i].name = childNodes[i].roleName.replace(/\.n/g, '.');
		childNodes[i].isParent = true;
		childNodes[i].uid = childNodes[i].id;
	}
	return childNodes;
}
 
function isDepartmentNameExists(field,type,opts){
	console.log(opts.model);
	if(opts.model=="update"){
		return "";
	}else{
		var dfd = $.Deferred();
		$.getJsonData(contextPath+"/department/check",{name:field.val()},{type:"Post"}).done(function(result){
			if(result.result){
				dfd.resolve("");
			}else{
				dfd.resolve("部门已经存在.<br/>");
			}
		});
		return dfd.promise();
	}
}