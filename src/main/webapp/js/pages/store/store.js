
var table;
$(function(){
	table = $("#storeTable").table({
		url:contextPath+"/store/list",
		columns:[{name:"name",display:"商品名"},{name:'price',display:'单价'},{name:'number',display:'数量'}],
		formatData:function(data){return data.items;},
		title:"商品列表",
		rowId:"id",
		buttons:[
		         {
		        	 text:"增加商品",
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
		$('#storeForm').reset();
		$('#storeForm').dialog({
			title:"添加一个商品",
			afterShown:function(){
				$("#storeForm").validate({align:'right',theme:"darkblue"});
			},
			beforeClose:function(){
				$("#storeForm").validate("hide");
			},
			buttons:[
			         {
			        	 text : "保存",
			        	 css  : "btn btn-primary",
			        	 click:function(){
			        		 $("#storeForm").validate("validate").done(function(result){
			        			 if(result){
			        				 $("#storeForm").ajaxSubmitForm(contextPath+"/store/add","",
					        				 function(){
					 			        		 $("#storeForm").dialog("close");
					 			        		 $("#storeTable").table("refresh");
					 			        		 $("#storeForm").reset();
					 			        		 moon.success("商品添加成功");
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
			        		 $("#storeForm").dialog("close");
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
		$("[name$='name']","#storeForm").val(name);
		$("[name$='price']","#storeForm").val(selectRows[0].price);
		$("[name$='number']","#storeForm").val(selectRows[0].number);
		$('#storeForm').dialog({
			title:"编辑商品",
			afterShown:function(){
				$("#storeForm").validate({align:'right',theme:"darkblue",model:"update"});
			},
			beforeClose:function(){
				$("#storeForm").validate("hide");
			},
			buttons:[
			         {
			        	 text : "保存",
			        	 css  : "btn btn-primary",
			        	 click:function(){
			        		 $("#storeForm").validate("validate").done(function(result){
			        			 if(result){
					        		 $("#storeForm").ajaxSubmitForm(contextPath+"/store/update",
						        			 {"store.id":id},
					        				 function(){
					 			        		 $("#storeForm").dialog("close");
					 			        		 table.refresh();
					 			        		 $("#storeForm").reset();
					 			        		 moon.success("修改商品成功");
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
			        		 $("#storeForm").dialog("close");
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
		   $.post(contextPath+"/store/delete",ids,function(result){
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
 
function isStoreNameExists(field,type,opts){
	console.log(opts.model);
	if(opts.model=="update"){
		return "";
	}else{
		var dfd = $.Deferred();
		$.getJsonData(contextPath+"/store/check",{name:field.val()},{type:"Post"}).done(function(result){
			if(result.result){
				dfd.resolve("");
			}else{
				dfd.resolve("商品已经存在.<br/>");
			}
		});
		return dfd.promise();
	}
}