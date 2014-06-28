<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>登录</title>
<script type="text/javascript">
$(document).ready(function() {
	var initusertip = "邮箱/用户名";
	$("#username").val(initusertip);
	
	$("#username").click(function(){
		if($(this).val() == initusertip){
			$(this).val("");
			$(this).css("color", "black");
		}
	})
	
	$("#submitButton").click(function(){
		window.top.location = "../../user/index";
	});
});
</script>
<style type="text/css">
.windowMask{
background-color:white;
}
</style>
</head>
<body>

<form id="ajax_login_form">
<div class="loginWrap">
  

  <!-- 注册成功提示 开始-->
  <div class="loginBox">
    <div class="loginBoxT"></div>
    <div class="loginBoxC">
      <div class="loginBoxR">
        <div class="loginBoxL">  
          <div class="loginCon">
            <p class="loginTips">注册成功！</p>
            <div class="infoBtn">
              <input type="button" value="确定" name="" id="submitButton" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loginBoxB"></div>  
  </div>
  <!-- 注册成功提示 结束-->



  <div class="windowMask"></div>  
</div>
</form>
</body>
</html>