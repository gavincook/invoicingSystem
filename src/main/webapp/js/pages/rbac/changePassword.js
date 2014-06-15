$(function() {
	$("form").validate({
		theme : "darkblue",
		errorMsg : {
			'required' : '该项为必填项,请填写...<br/>'
		}
	});
	$("#confirm").click(function() {
		$("form").validate("validate").done(function(result){
			if(result){
				$.getJsonData(contextPath + "/user/doChangePassword",{
					password : $("#newPassword").val()
				},{type:"Post"}).done(function(){
					moon.info("密码修改成功");
					$("form").reset();
				});
			}
		});
	});
});

function checkOldPassword() {
	var msg = "";
	$.postData(contextPath + "/user/matchOldPassword", {
		password : $("#oldPassword").val()
	}, function() {

	}, function() {
		msg = "原密码不正确，请核对.<br/>";
	}, function() {

	}, false);
	return msg;
}