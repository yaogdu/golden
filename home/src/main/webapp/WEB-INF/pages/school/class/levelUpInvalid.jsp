<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<title>班级管理</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">
			           	<p>升级管理</p>
		           		<div class="operBtn">
		             		<div class="BtnWhite28">
		             			<a href="javascript:window.history.back(-1);" class="btnSave"><span class="returnIco"></span>返回</a>
		             		</div>
		           		</div>
					</div>
        			<div class="mainPart">
        				<div class="conBox">
        					<input type="hidden" id="context" value="${static_ctx}"/>
            				<div class="tipsBox">${message }</div>
        					
        				</div>
        			</div>
        		</div>
        	</div>
        </div>
        <%@include file="/WEB-INF/pages/commons/school/footer.jsp"%>
	</div>
	<script type="text/javascript">
		$(document).ready(function(){
		    $("#hd_menu_class").attr("class","current");
			$("#lmenu_2").attr("class","current");
		});
	</script>
</body>
</html>

