<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
		<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
		<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
		
		<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
		<script src="${static_ctx}/static/js/school/student/updateStudent.js" type="text/javascript" ></script>
		<title>编辑学生</title>
	</head>
	<body>
		<div class="container">
			<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
			<div class="mainWrap">
				<div class="mainIndex">
					<%@include file="include/left-menu.jsp" %>
					<div class="mainCon">
						<div class="mainTitle">
							编辑学生
						</div>
						<div class="mainPart">
							<div class="conFormWrap">
								<div class="formCon">
									<form  action="update" method="POST" id="Form">
										<div class="formList">
											<label>系统号:</label>
											<div class="info">
												<span class="infoLabel" id="system_id">${systemId}</span>
											</div>
										</div>
										<div class="formList">
											<label>登录名:</label>
											<div class="info">
												<input type="text" name="login_name" id="login_name" value="${studentInfo.login_name}" />
											</div>
										</div>
										<div class="formList">
											<label><em>*</em>学段/年级/班级:</label>
											<div class="info">
												<select name="stage" disabled="disabled">
													<option>${studentInfo.stage}</option>
												</select>
												<select name="grade" disabled="disabled">
													<option>${studentInfo.grade}</option>
												</select>
												<select name="klass" disabled="disabled">
													<option>${studentInfo.class_number}班</option>
												</select>
											</div>
										</div>
										<div class="formList">
											<label><em>*</em>入学日期:</label>
											<div class="info">
											    <div class="selectBoxWrap" >
												       <div class="trigger">
												           <input type="text" name="enter_time" id="startTime" class="selectText" value="<fmt:formatDate value="${studentInfo.enter_time}" type="date" />" style="width:100px;"/>
												           <a class="btnTrigger time" href="javascript:void(0);" id="start_click"></a>
												       </div>
												       <div class="selectBox" style="display:none">
												       </div>
												   </div>
											</div>
										</div>
										<div class="formList">
											<label><em>*</em>姓名:</label>
											<div class="info">
												<input type="text" name="name" value="${studentInfo.name}" id="name"/>
											</div>
										</div>
										<div class="formList">
											<label>学号:</label>
											<div class="info">
												<input type="text" name="school_number" value="${studentInfo.school_number}" id="school_number" />
											</div>
										</div>
										<div class="formList">
											<label>性别:</label>
											<div class="info">
												<select name="gender">
													<option <c:if test="${studentInfo.gender == 1}">selected</c:if> value="1">男</option>
													<option <c:if test="${studentInfo.gender == 2}">selected</c:if> value="2">女</option>
												</select>
											</div>
										</div>
										<div class="formList">
											<label>手机:</label>
											<div class="info">
												<input type="text" name="tel" value="${studentInfo.tel}" id="tel"/>
											</div>
										</div>
										<div class="formList">
											<label>邮箱:</label>
											<div class="info">
												<input type="text" name="email" value="${studentInfo.email}" id="email"/>
											</div>
										</div>
										<div class="formList">
											<div class="info">
											<div class="conBtnWrap conBtnWrap02">
                                               <div class="BtnOrange30">
												     <a href="javascript:void(0)" class="btnSave" id="Ssubmit" />确定</a>
											   </div>
											   <div class="BtnGray30">
											         <a href="javascript:window.history.back(-1);" class="btnSave" id="Back" />返回</a>
											   </div>
											</div>
										</div>
									</form>
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

