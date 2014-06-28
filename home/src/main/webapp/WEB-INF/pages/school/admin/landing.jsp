<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<title>后台管理</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<img src="${static_ctx}/static/img/school/img/welcome-jiaowu.jpg" />
        		</div>
        	</div>
        </div>
		<%@include file="/WEB-INF/pages/commons/school/footer.jsp"%>
	</div>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#hd_menu_system").attr("class","current");
		});
	</script>
</body>
</html>

