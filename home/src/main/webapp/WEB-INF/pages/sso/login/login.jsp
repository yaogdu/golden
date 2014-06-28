<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
		<title>登录</title> 
	    <%--<script src="${static_ctx}/static/js/MD5.js"></script>
	    <script src="${static_ctx}/static/js/messages_zh.js"></script>--%>
	    <script src="${static_ctx}/static/js/sso/login/login.js" type="text/javascript"></script>
	    <script src="${static_ctx}/static/js/sso/login/MD5.js" type="text/javascript"></script>
  	</head>

<body>
	<div class="container login_container">
		<!-- header start -->
		<div class="header">
			<div class="headCon">
				<h1 class="headLogo">
				<a title="新东方" href=""><img src="${static_ctx}/static/img/school/logo/logo_schoolLogin01.png" /> </a>
				</h1>
			</div>
		</div>
		<!-- header end -->
		<!-- main start -->
		<div class="mainWrap">
			<div class="mainIndex">
				<div class="loginBox">
					<div class="loginTitle loginTitle01">
						<p>用户登录</p>
					</div>
					<div class="loginCon">
						<input type="hidden" id="context" value="${static_ctx}"/>
						<div class="loginList">
							<div class="loginHint">${msg }</div>
							<div class="loginForm">
								<div class="formBox">
									<span class="icoUers"></span>
									<input id="loginUser" value="${username }" maxlength="30" class="inputText" type="text" name="loginUser" placeholder="用户名/系统号" class="required input-block-level"/>
								</div>
							</div>
						</div>
						<div class="loginList">
							<div class="loginHint"></div>
							<div class="loginForm">
								<div class="formBox">
									<span class="icoPsw"></span>
									<input id="loginPass" maxlength="30" class="inputText" type="password" name="loginPass" placeholder="密码" class="required input-block-level"/>
								</div>
							</div>
						</div>
						<div class="loginList">
							<div class="loginHint"></div>
							<div class="loginForm">
								<div class="formBox">
									<input type="radio" value="1" <c:if test="${userType == 1 }">checked="checked"</c:if> name="userType"/>教师
									<input type="radio" value="2" <c:if test="${userType == 2 }">checked="checked"</c:if> name="userType"/>学生
									<input type="radio" value="0" <c:if test="${userType == 0 }">checked="checked"</c:if> name="userType"/>管理员
								</div>
							</div>
						</div>
						<div class="loginList">
							<div class="loginHint"></div>
							<div class="loginForm">
								<div class="formBox">
									<input type="radio" value="2" <c:if test="${loginType == 2 }">checked="checked"</c:if> name="loginType"/>登录名
									<input type="radio" value="1" <c:if test="${loginType == 1 }">checked="checked"</c:if> name="loginType"/>系统号
								</div>
							</div>
						</div>						
						 <div class="loginList">
						 	<div class="loginHint"></div>
				            <div class="loginForm loginForm01">
				              <div class="formBox">
				                <input id="validateCode" maxlength="30" class="inputText" type="text" name="validateCode" placeholder="验证码" />
				              </div>
				            </div>
				            <div class="loginCode">
				              <a href="javascript:void(0);" class="infoCode" title="看不清，换一个"><img id="random_code" src="${static_ctx}/captchahtm"/></a>
				              <a href="javascript:reloadImg();" class="infoCut">看不清，换一个</a>
				            </div>
				      	</div>
						<div class="loginBtn">
							<input id="login_submit" type="button" value="登录" name="" onclick="login()"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- main end -->
		<!-- footer start -->
		<%@include file="/WEB-INF/pages/commons/footer.jsp" %>
		<!-- footer end -->
	</div>	
   	
  </body>
</html>
