$(document).ready(function(){
	$(".BackToTop").remove();
});

function login()
{
	var loginUser = $("#loginUser").val();
	if( loginUser == null || loginUser == '' )
	{
		util.dialog.messageDialog('用户名必填');
		return;
	}
	
	var loginPass = $("#loginPass").val();
	if( loginPass == null || loginPass == '' )
	{
		util.dialog.messageDialog('密码必填');
		return;
	}
	
	var validateCode = $("#validateCode").val();
	if( validateCode == null || validateCode == '' )
	{
		util.dialog.messageDialog('验证码必填');
		return;
	}
	
	var url = $("#context").val() + "/school/AdminLogin/login";
	
	var data = {
		name: loginUser,
		password:loginPass,
		validateCode:validateCode
    };
	
	$.ajax({
		url: url,
		type: "post",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				window.location.href = $("#context").val() + "/school/AdminLogin/toLandingPage";
				return true;
			}
			else
			{
				reloadImg();
				util.dialog.messageDialog(data.message);
				return false;
			}
		},
		error: function(XMLHttpRequest, textStatus){
			util.dialog.messageDialog("请求异常：" + XMLHttpRequest.statusText + "|" 
					+ XMLHttpRequest.status + "。请稍后重试或者联系技术支持。");
			return false;
		}
	});
	
}

function reloadImg()
{
	$("#random_code").attr("src", $("#context").val() + "/captchahtm?time=" + new Date()); 
}