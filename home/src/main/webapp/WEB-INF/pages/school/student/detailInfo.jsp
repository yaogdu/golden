<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
	
	<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
	<title>学生详情</title>
	<script type="text/javascript">
	    $(document).ready(function() {
	    	$("#hd_menu_student").addClass("current");
	    })
	</script>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
        <div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
				<div class="mainCon">
					<div class="mainTitle">
					学生详情
					<div class="operBtn">
								<div class="BtnWhite28">
									<a href="javascript:window.history.back(-1);" class="btnSave" id="export">
									   <span class="returnIco"></span>	
										返回
									</a>
								</div>
							</div>
					</div>
       				<div class="mainPart">
       				     <div class="conFormWrap">
       				        <div class="formCon formCon02">
						        <div class="formList">
								    <label>系统号:</label>
								        <div class="info">
								            <span class="infoLabel">${studentDetail.system_id}</span>
								    	</div>
								</div>
								<div class="formList">
								    <label>登录名:</label>    	
								    <div class="info">
								    		<span class="infoLabel">${studentDetail.login_name}</span>
								    </div>
								</div>
								<div class="formList">
								    <label>班级:</label>
								    <div class="info">
								    	<span class="infoLabel">${studentDetail.stage}/${studentDetail.grade}/${studentDetail.class_number}班</span>
								    </div>
								</div>
								<div class="formList">
								    <label>入学日期:</label>
								    <div class="info">	
								        <span class="infoLabel"><fmt:formatDate value="${studentDetail.enter_time}" type="date"/></span>
								    </div>
								</div>
								<div class="formList">
								    <label>姓名:</label>
								    <div class="info">
								    	    <span class="infoLabel">${studentDetail.name}</span>
								    </div>
								</div>
								<div class="formList">
								                <label>学号:</label>
								    		<div class="info">
								    		<span class="infoLabel">${studentDetail.school_number}</span>
								</div>
								</div>
								<div class="formList">
								    <label>性别:</label>								    	   
								    <div class="info">
								       <span class="infoLabel">
								    			<c:if test="${studentDetail.gender == 1}">
								    			 男
								    			</c:if>
								    			<c:if test="${studentDetail.gender == 2}">
								    			女
								    			</c:if>
								    	</span>
								    	</div>
								   </div>
								   <div class="formList">
								   <label>手机:</label>
								   <div class="info">
								       <span class="infoLabel">${studentDetail.tel}</span>
								   </div>
								   </div>
								   <div class="formList">
								       <label>邮箱:</label>
								       <div class="info">
								    		<span class="infoLabel">${studentDetail.email}</span>
								    	</div>
								    </div>
            					</div>
            				</div>
            			</div>
				</div>
		    </div>
         <div class="BackToTop"><a title="返回顶部" href="#">返回顶部</a></div>
       </div>
		<!-- 底部 -->
		<%@include file="/WEB-INF/pages/commons/school/footer.jsp" %>
	</div>
</body>
</html>

