<%@page import="com.noriental.security.usermanage.shared.utils.SessionUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录</title>
<script type="text/javascript">
var back = function() {
	setTimeout(function() {
		var second = parseInt($("#back_second").html());
		if(second>0) {
			$("#back_second").html(second-1);
			back();
		} else {
			window.history.back(-1);
		}
	}, 1000);
}
</script>
</head>

<body onload="back();">
<!-- cantainer start-->
<div class="container">
    <%@include file="/WEB-INF/pages/commons/header.jsp" %>
  <!-- main start -->
  <div class="mainWrap">
  	<div class="errorBox errorBox01">
  	  <div class="errorLf"><img src="${static_ctx }/static/img/404.jpg" /></div>
      <div class="errorRt">
        <div class="error">
          <h3>很抱歉，您的登录请求异常!</h3>
          <p>${msg }</p></br>
          <p>（<span id="back_second">5</span> 秒之后页面自动跳转）</p>
        </div>
      </div>
    </div>
  </div>
  <!-- main end -->
  <%@include file="/WEB-INF/pages/commons/footer.jsp" %>
</div>
</body>
</html>
