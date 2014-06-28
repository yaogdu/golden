<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<script src="${static_ctx}/static/js/school/teacher/updateTeacher.js" type="text/javascript"></script>
	<title>编辑教师</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle"><p>编辑教师</p></div>
        			<div class="mainPart">
           				<div class="conFormWrap">
           					<div class="formCon formCon02">
           						<input type="hidden" id="context" value="${static_ctx}"/>
								<input type="hidden" id="schoolId" value=""/>
								<input type="hidden" id="teacherId" value="${teacher.id}"/>
           						<div class="formList">
                 					<label>系统号：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${teacher.systemId}</span>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label><em>*</em>登录名：</label>
				                  	<div class="info">
					                    <input type="text" id="loginName" value="${teacher.loginName}" maxlength="10"/>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label><em>*</em>姓名：</label>
				                  	<div class="info">
					                    <input type="text" id="teacherName" value="${teacher.name}" maxlength="10"/>
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
					                    <input type="text" id="tel" value="${teacher.tel}" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"/>
				                  	</div>
				                </div>
				                <div class="formList">
                 					<label>邮箱：</label>
				                  	<div class="info">
					                    <input type="text" id="email" value="${teacher.email}" maxlength="64"/>
				                  	</div>
				                </div>
        					</div>
        				</div>
        				<div class="conBtnWrap conBtnWrap01">
				        	<div class="BtnOrange30">
				              	<a href="javascript:void(0)" class="btnSave" id="btnSave" onclick="update()">确定</a>
				            </div>
				            <div class="BtnGray30">
				              	<a href="javascript:void(0)" class="btnSave" onclick="cancel()">取消</a>
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

