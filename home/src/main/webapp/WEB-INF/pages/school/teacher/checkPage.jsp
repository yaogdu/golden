<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="tList" scope="request" type="java.util.List<com.noriental.school.domain.Teacher>" /> 
<html> 
    <head>
    <title>查看教师</title>
    <%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
	
	<script src="${static_ctx}/static/js/school/academicYear/addAcademicYear.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
    <title>教师详情</title>
    </head>
<body>
<div class="container">
<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
<div class="mainWrap">
<div class="mainIndex">
<%@include file="include/left-menu.jsp" %>
<div class="mainCon">
<div class="mainTitle">查看教师</div>
<div class="mainTitle">基础信息</div>
<div class="mainPart">
<div class="conFormWrap">
<div class="formCon">
          <table>
			<tr>
				<td><label>系统号：</label></td>
				<td><label>${tList[0].systemId}</label></td>
       		</tr>
			<tr>
				<td><label>登录名：</label></td>
				<td><label>${tList[0].loginName}</label></td>
       		</tr>
			<tr>
				<td><label>姓名：</label></td>
				<td><label>${tList[0].name}</label></td>
       		</tr>
			<tr>
				<td><label>学段：</label></td>
				<td><label>${tList[0].stage}</label></td>
       		</tr>
			<tr>
				<td><label>学科：</label></td>
				<td><label>${tList[0].subject}</label></td>
       		</tr>
   			<tr>
    			<td><label>手机：</label></td>
				<td><label>${tList[0].tel}</label></td>
    		</tr>
			<tr>
    			<td><label>邮箱：</label></td>
				<td><label>${tList[0].email}</label></td>
    		</tr>
			<tr>
    			<td><label>状态：</label></td>
				<td><label>
				<c:if test="${tList[0].status=='1'}">启用</c:if>
				<c:if test="${tList[0].status=='0'}">停用</c:if>
				</label></td>
    		</tr>
    	</table>
  </div>
</div>
</div>
</div>
</div>
</div>
		<!-- 底部 -->
		<%@include file="/WEB-INF/pages/commons/school/footer.jsp" %>
	</div>
</body>
</html>