
var table;

var i= 1;
var userZtree;
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
				i = userZtree.selectNodebyTreepath("uid",temp,i);
			},
			onExpand : function(){
				i = userZtree.selectNodebyTreepath("uid",temp,i);
			}
		}
}; 

$(function(){
	table = $("#userTable").table({
		url:contextPath+"/user/getUsersData",
		columns:[{name:"id"},{name:"user_name",display:"用户名"},{name:"department_name",display:"部门"}],
		formatData:function(data){return data.rows;},
		title:"用户列表",
		rowId:"id",
		buttons:[
		         {
		        	 text:"增加用户",
		        	 click:btnHandler,
		        	 name:'addBtn'
		         },
		         {
		        	 text:"编辑用户",
		        	 click:btnHandler,
		        	 name:'editBtn'
				 },
				 {
					 text:"删除用户",
					 click:btnHandler,
					 name:'deleteBtn'
				 },
				 {
					 text:"分配角色",
					 click:btnHandler,
					 name:'assignBtn'
				 }
		         ]
	});
	

	$.fn.zTree.init($("#roleTree"), setting,znodes);
	userZtree = $.fn.zTree.getZTreeObj("roleTree");
	userZtree.reAsyncChildNodes(userZtree.getNodes()[0]);

});
		
var temp = [];
function btnHandler(btnTest){
	btnTest = btnTest.name;
	if(btnTest=='addBtn'){//添加用户
		$('#userForm').reset();
		$('#userForm').dialog({
			title:"添加用户",
			afterShown:function(){
				$("#userForm").validate({align:'right',theme:"darkblue"});
			},
			beforeClose:function(){
				$("#userForm").validate("hide");
			},
			buttons:[
			         {
			        	 text : "保存",
			        	 css  : "btn btn-primary",
			        	 click:function(){
			        		 $("#userForm").validate("validate").done(function(result){
			        			 if(result){
			        				 $("#userForm").ajaxSubmitForm(contextPath+"/user/add","",
					        				 function(){
					 			        		 $("#userForm").dialog("close");
					 			        		 $("#userTable").table("refresh");
					 			        		 $("#userForm").reset();
					 			        		 moon.success("用户添加成功");
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
			        		 $("#userForm").dialog("close");
			        	 }
			         }
			         ]
		});
	}else if(btnTest=='editBtn'){//编辑用户
		var selectRows = table.getSelect();
		if(selectRows.length!=1){
			moon.warn("请选中一条数据进行编辑.");
			return false;
		}
		var id = selectRows[0].id;
		$("#userForm").autoCompleteForm(contextPath+"/user/get",{id:id});
		$('#userForm').dialog({
			title:"编辑用户",
			afterShown:function(){
				$("#userForm").validate({align:'right',theme:"darkblue",model:"update"});
			},
			beforeClose:function(){
				$("#userForm").validate("hide");
			},
			buttons:[
			         {
			        	 text : "保存",
			        	 css  : "btn btn-primary",
			        	 click:function(){
			        		 $("#userForm").validate("validate").done(function(result){
			        			 if(result){
					        		 $("#userForm").ajaxSubmitForm(contextPath+"/user/update",
						        			 {"user.id":id},
					        				 function(){
					 			        		 $("#userForm").dialog("close");
					 			        		 table.refresh();
					 			        		 $("#userForm").reset();
					 			        		 moon.success("修改用户信息成功");
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
			        		 $("#userForm").dialog("close");
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
		   $.post(contextPath+"/user/logicDelete",ids,function(result){
			   table.refresh();
		  });
		}
	}else{//分配角色
		var selectRows = table.getSelect();
		if(selectRows.length!=1){
			moon.warn("请选择一个用户进行角色分配.");
			return false;
		}
		var uid = selectRows[0].id;
		 $.postData(contextPath+"/user/getRolePath",{uid:uid},function(result){
			
			 userZtree.expandNode(userZtree.getNodes()[0],true);
			// alert(result.path);
			 if(result.path)
			 {
			 temp = result.path.split(",");
			 if(temp.length!=1)
				 userZtree.asyncOrExpandNode(userZtree.getNodeByParam("uid",temp[0]),true);
			 else{
				 userZtree.selectNode(userZtree.getNodeByParam("uid",temp[0]));
				 i = 1;
			 }
			 }
			 else{
				 temp=[];
				 return false;
			 }
		 });
		   $("#roleTree").dialog({
			   title:'分配角色',
			   buttons:[{
				   text:'确定',
				   css : "btn btn-primary",
				   click:function(){
					   if(userZtree.getSelectedNodes().length!=1){
						   moon.warn("请选择一个角色进行分配");
						   return false;
					   }
					  $.post(contextPath+"/role/assignRoleToUser",
							  {uid:uid,
						       rid:userZtree.getSelectedNodes()[0].id},
						       function(result){
						    	   moon.info("角色分配成功");
						    	   table.refresh();
						    	   $("#roleTree").dialog("close");
						    	   userZtree.cancelSelectedNode(userZtree.getSelectedNodes[0]);
								   userZtree.expandAll(false);
						       }
					  );
				   }
			   },{
				   text:'取消',
				   css : "btn",
				   click:function(){
					   $("#roleTree").dialog("close");
				   }
			   }]
		   });
		   
		 
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
 
function isUserNameExists(field,type,opts){
	console.log(opts.model);
	if(opts.model=="update"){
		return "";
	}else{
		var dfd = $.Deferred();
		$.getJsonData(contextPath+"/user/checkUserName",{userName:field.val()},{type:"Post"}).done(function(result){
			if(result.userNameExists){
				dfd.resolve("用户名已经存在.<br/>");
			}else{
				dfd.resolve("");
			}
		});
		return dfd.promise();
	}
}