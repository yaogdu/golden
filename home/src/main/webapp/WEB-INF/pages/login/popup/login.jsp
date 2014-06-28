<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>登录</title>
<script type='text/javascript' src='${static_ctx }/static/js/login.js'></script>
<%
Object times = session.getAttribute("logintesttimescookiename");
int testtimes = times == null ? 0 : (Integer)times;
request.setAttribute("testtimes", testtimes);

String returnurl = request.getParameter("returnurl");
%>
<script type="text/javascript">
returnurl = '<%=returnurl == null ? "" : returnurl%>';

var data = {
		username:{ inittext: '用户名', cannull: false },
		password: { inittext: '密码', ispassword: true, cannull: false },
		validatecode: { inittext: '验证码', cannull: true }
	};

$(document).ready(function() {

	initControl(data);
	
	if( ${testtimes} >= 3){
		$("#divvalidatecode").css("display", "");
		data.validatecode.cannull = false;
	}
	
	$("#submitButton").click(function(){
		var cancontinue = validateControl(data);
		if(!cancontinue){
			return;
		}
		
		var url = ctx + "/login/login";
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
					if(returnurl){
						window.top.location = returnurl;
					}
					else{
						window.top.location = window.top.location;
					}
				}
				else{
					$('#message').html(retdata.message);
					for(var c in data){
						$("#"+c+"_message").text(retdata[c + "_message"]);
					}
					
					if(retdata.need_validatecode){
						$("#divvalidatecode").css("display", "");
						data.validatecode.cannull = false;
						$("#resetvalidatecode").click();
					}
				}
	        }
	    });
	});
});
</script>
<style type="text/css">
.windowMask{
background-color:white;
}
body{
overflow:hidden;
}
</style>
</head>
<body>

<form id="ajax_login_form">
<div class="loginWrap">
  <!-- 登录/注册 开始-->
  <div class="loginBox">
    <div class="loginBoxT"></div>
    <div class="loginBoxC">
      <div class="loginBoxR">
        <div class="loginBoxL">
<!--           <div class="loginTitle"><p>登录/注册</p></div> -->
          <div class="loginCon">
            <div class="loginInfo">          
              <div class="infoWrap">
                <div class="infoList">
                  <div class="infoHint"><span id="username_message"></span></div>
                  <div class="infoForm">
                    <span class="formIco formIco02"></span> 
                    <input class="infoText" type="text" value="" name="username" id="username"/>
                  </div> 
                </div>
                <div class="infoList">
                  <div class="infoHint"><span id="password_message"></span></div>
                  <div class="infoForm">
                    <input class="infoText" type="text" value="" name="password" id="password"/>
                  </div> 
                </div>
                
                <div class="infoList">
                  <div class="infoHint"><span id="password_message"></span></div>
                  <div class="infoForm">
                  	<input type="radio" name="type" id="teacher" value="teacher" checked="checked" />
                  	<label for="teacher">老师</label>
                  	&nbsp;
                  	<input type="radio" name="type" id="student" value="student" />
                  	<label for="student">学生</label>
                  </div> 
                </div>
                
                <div class="infoList" id="divvalidatecode" style="display:none;">
                  <div class="infoHint"><span id="validatecode_message"></span></div>
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
                    <input class="infoCkb" type="checkbox"  name="rememberme" value="true" />
                    <label class="infoLbl">七天内自动登录</label>
                  </div>
<!--                   <div class="infoPswRt"> -->
<%--                     <a target="_blank" href="${ctx }/login/getpassword">忘记密码</a> --%>
<!--                   </div> -->
                </div>
                <div class="infoBtn">
                  <input type="button" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" name="" id="submitButton"/>
                </div>       
              </div> 
<!--               <div class="listTab"> -->
<!--                 <p class="infSplit">用户注册<i></i></p> -->
<!--                 <ul class="titleTab"> -->
<%--                   <li class="current"><a  class="mr5" href="${ctx }/login/popup/register?type=teacher">我是老师</a></li> --%>
<%--                   <li class="current"><a href="${ctx }/login/popup/register?type=student">我是学生</a></li> --%>
<!--                 </ul> -->
<!--               </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
<!--     <div class="loginBoxB"></div>   -->
  </div>
  <!-- 登录/注册 结束-->
  
<!--   <div class="windowMask"></div>   -->
</div>
</form>
</body>
</html>