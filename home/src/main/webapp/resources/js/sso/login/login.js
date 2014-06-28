$(document).ready(function(){
	$('.BackToTop').remove();
});

function login()
{
	var loginUser = $.trim($("#loginUser").val());
	if( loginUser == null || loginUser == '' )
	{
		util.dialog.messageDialog('用户名/系统号必填');
		return;
	}
	
	var loginPass = $.trim($("#loginPass").val());
	if( loginPass == null || loginPass == '' )
	{
		util.dialog.messageDialog('密码必填');
		return;
	}
	
	var validateCode = $.trim($("#validateCode").val());
	if( validateCode == null || validateCode == '' )
	{
		util.dialog.messageDialog('验证码必填');
		return;
	}
	
	var userType = $('input:radio[name="userType"]:checked').val();
	if( userType == null || userType == '' )
	{
		util.dialog.messageDialog('请选择登录用户类型');
		return;
	}
	
	var loginType = $('input:radio[name="loginType"]:checked').val();
	if( loginType == null || loginType == '' )
	{
		util.dialog.messageDialog('请选择登录方式');
		return;
	}
	
	var url = $("#context").val() + "/sso/ssoLogin?z=";
	url += "&username=" + encodeURI(encodeURI(loginUser));
	url += "&userType=" + userType;
	url += "&pwd=" + hex_md5(loginPass);
	url += "&loginType=" + loginType;
	
	window.location.href = url;
	
}

function reloadImg()
{
	$("#random_code").attr("src", $("#context").val() + "/captchahtm?time=" + new Date()); 
}