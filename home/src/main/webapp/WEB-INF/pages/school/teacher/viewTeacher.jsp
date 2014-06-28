<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<script src="${static_ctx}/static/js/school/teacher/viewTeacher.js" type="text/javascript"></script>
	<title>教师详情</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">
        				<p>教师详情</p>
		           		<div class="operBtn">
		             		<div class="BtnWhite28">
		             			<a href="javascript:window.history.back(-1);" class="btnSave"><span class="returnIco"></span>返回</a>
		             		</div>
		           		</div>	
        			</div>
        			<div class="mainPart">
           				<div class="conFormWrap">
           					<div class="formCon formCon02">
           						<div class="formList">
                 					<label>系统号：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${teacher.systemId}</span>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label>登录名：</label>
				                  	<div class="info">
				                  		<span class="infoLabel">${teacher.loginName}</span>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label>姓名：</label>
				                  	<div class="info">
				                  		<span class="infoLabel">${teacher.name}</span>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label>学段：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${teacher.stage}</span>
				                  	</div>
				                </div>
				                <div class="formList">
                 					<label>学科：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${teacher.subject}</span>
				                  	</div>
				                </div>
				                <div class="formList">
                 					<label>手机：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${teacher.tel}</span>
				                  	</div>
				                </div>
				                <div class="formList">
                 					<label>邮箱：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${teacher.email}</span>
				                  	</div>
				                </div>
				                <div class="formList">
                 					<label>状态：</label>
				                  	<div class="info">
					                    <span class="infoLabel">
					                    	<c:if test="${teacher.status == 1 }">启用</c:if>
					                    	<c:if test="${teacher.status == 0 }">停用</c:if>
										</span>
				                  	</div>
				                </div>
        					</div>
        				</div>
        			</div>
        		</div>
			</div>
		</div>
		<%@include file="/WEB-INF/pages/commons/school/footer.jsp"%>
	</div>
</body>
</html>

