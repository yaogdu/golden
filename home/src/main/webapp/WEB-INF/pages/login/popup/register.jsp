<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<title>注册</title>
<script type='text/javascript' src='${static_ctx }/static/js/login.js'></script>
<script type="text/javascript">

var data = {
	username:{ inittext: '用户名', cannull: false },
	email: { inittext: '邮箱', cannull: false, isemail: true },
	userpassword: { inittext: '密码', ispassword: true, cannull: false },
	userpassword1: { inittext: '确认密码', ispassword: true, cannull: false },
	validatecode: { inittext: '验证码', cannull: false },
	readxieyi: { cannull: false, ischeckbox: true }
};

$(document).ready(function() {
	initControl(data);
	$("#submitButton").click(function(){
		var cancontinue = validateControl(data);
		if(!cancontinue){
			return;
		}
		var url = ctx + "/login/register";
		var result = false;
		$("#ajax_login_form").ajaxSubmit({
			url : url,
	        type : "post",
	        dataType : "json",
	        async : false,
	        beforeSubmit : function() {
	        },
	        success : function(retdata) {
	        	result = retdata.success;
				if (retdata.success) {
					window.location = "register_success";
				}
				else{
					$("#resetvalidatecode").click();
					for(var c in data){
						$("#"+c+"_message").text(retdata[c + "_message"]);
					}
				}
	        }
	    });
	});
	
	$('#hd_xieyi').click(function() {
		var popuppath = ctx
				+ "/login/popup";
		window.top.art
				.dialog({
					lock : true,
					opacity : 0.5, // 透明度
					width : 420,
					height : 370,
					zIndex : 2000,
					id : "xieyi_dialog",
					title : '服务使用协议',
					content : "<iframe style='width:400px; height:350px; border:0px;' src='"+popuppath+"/xieyi'></iframe>",
					okValue : '确认',
					padding : '0px',
					model : true,
					okValue : '确认',
					ok : function() {

					}
				});
		return false;
	});
});
</script>
<style type="text/css">
.windowMask {
	background-color: white;
}

body {
	margin: 0;
	padding: 0;
}

.loginWrap .loginCon {
	padding-top: 10px;
	margin-top: 0px;
	padding-bottom: 0px;
}

.loginWrap .loginCon .loginInfo .listTab .infSplit {
	margin-bottom: 5px;
}
</style>
</head>
<body>

	<form id="ajax_login_form">
		<div class="loginWrap">

			<%
				String type = request.getParameter("type");
				String typename = "学生";
				request.setAttribute("isteacher", false);
				if(type.equalsIgnoreCase("teacher")){
					typename = "老师";
					request.setAttribute("isteacher", true);
				}
				request.setAttribute("type", type);
				request.setAttribute("typename", typename);
			%>

			<!-- 老师注册 开始-->
			<div class="loginBox">
				<!--     <div class="loginBoxT"></div> -->
				<div class="loginBoxC">
					<div class="loginBoxR">
						<div class="loginBoxL">
							<!--           <div class="loginTitle"><p>登录/注册</p></div> -->
							<div class="loginCon">
								<div class="loginInfo">
									<div class="listTab listTab01">
										<p class="infSplit">
											${typename }注册<i></i>
										</p>
									</div>
									<div class="infoWrap">
										<div class="infoList">
											<div class="infoHint">
												<span id="username_message"></span>
											</div>
											<div class="infoForm">
												<span class="formIco formRight"></span> <input
													class="infoText" type="text" value="用户名"  id="username" name="username" />
											</div>
										</div>
										
										<c:if test="${isteacher}">
										<div class="infoList">
											<div class="infoHint">
												<span id="email_message"></span>
											</div>
											<div class="infoForm">
												<span class="formIco formWrong"></span> <input
													class="infoText" type="text" value="邮箱" id="email" name="email" />
											</div>
										</div>
										</c:if>
										
										<div class="infoList">
											<div class="infoHint">
												<span id="userpassword_message"></span>
											</div>
											<div class="infoForm">
												<input class="infoText" value="密码" id="userpassword" name="userpassword"  />
											</div>
										</div>
										<div class="infoList">
											<div class="infoHint">
												<span id="userpassword1_message"></span>
											</div>
											<div class="infoForm">
												<input class="infoText" value="确认密码" id="userpassword1" name="userpassword1" />
											</div>
										</div>
										<div class="infoList">
											<div class="infoHint">
												<span id="validatecode_message"></span>
											</div>
											<div class="infoForm">
												<input class="infoText infoText01" value="验证码" type=""
													id="validatecode" name="validatecode" /> <a class="infoCode" href="#"
													onclick="document.getElementById('capimg').src='${ctx }/captchahtm?date='+new Date(); return false;"><img
													id="capimg" style="width: 90px;" src="${ctx }/captchahtm" /></a>
												<a id="resetvalidatecode" class="infoCut" href="#"
													onclick="document.getElementById('capimg').src='${ctx }/captchahtm?date='+new Date(); return false;">换一张</a>
											</div>
										</div>
										<div class="infoPsw">
											<div class="infoPswLf">
												<input class="infoCkb" type="checkbox" value="" id="readxieyi" name="readxieyi" value="true" />
												<label class="infoLbl">我已阅读并同意<a id="hd_xieyi"
													href="#">星空网服务使用协议</a></label>
											</div>
										</div>
										<div class="infoBtn">
											<input type="button" value="注&nbsp;&nbsp;&nbsp;&nbsp;册"
												name="" id="submitButton" />
											<input type="hidden" name="type" value="${type }">
										</div>
									</div>
									<div class="infoReturn">
										<a href="${ctx }/login/popup/login">返回登录</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="loginBoxB"></div>
			</div>
			<!-- 老师注册 结束-->

			<div class="windowMask"></div>
		</div>
	</form>
</body>
</html>