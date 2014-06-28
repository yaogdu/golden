<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
	
	<script src="${static_ctx}/static/js/school/academicYear/updateAcademicYear.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
	<title>更新学年学期</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">编辑学年学期</div>
        			<div class="mainPart">
           				<div class="conFormWrap">
           					<div class="formCon formCon02">
           						<input type="hidden" id="context" value="${static_ctx}"/>
								<input type="hidden" id="ayId" value="${academicYear.id}"/>
								<div class="formList">
                 					<label>学年：</label>
				                  	<div class="info">
				                  		<span class="infoLabel">${academicYear.academicYear }</span>
				                  	</div>
				                </div>
								<div class="formList">
                 					<label>学期：</label>
				                  	<div class="info">
				                  		<span class="infoLabel">${academicYear.term }</span>
				                  	</div>
				                </div>
								<div class="formList">
                 					<label><em>*</em>开始日期：</label>
				                  	<div class="info"> <input type="text" id="startTime" value="<fmt:formatDate value="${academicYear.startTime }" pattern="yyyy-MM-dd"/>"/></div>
				                	<input type="hidden" id="originalEndTime" value="<fmt:formatDate value="${academicYear.endTime }" pattern="yyyy-MM-dd"/>"/>
				                </div>
								<div class="formList">
                 					<label><em>*</em>结束日期：</label>
				                  	<div class="info"><input type="text" id="endTime" value="<fmt:formatDate value="${academicYear.endTime }" pattern="yyyy-MM-dd"/>"/></div>
				                </div>
           					</div>
           				</div>
           				<div class="conBtnWrap conBtnWrap01">
				        	<div class="BtnOrange30">
				              	<a href="javascript:void(0)" class="btnSave" id="btnSave" onclick="update()">提交</a>
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

