<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
	
	<script src="${static_ctx}/static/js/school/class/addClass.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
	<title>添加班级</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">添加班级</div>
        			<div class="mainPart">
           				<div class="conFormWrap">
           					<div class="formCon formCon02">
           						<input type="hidden" id="context" value="${static_ctx}"/>
								<input type="hidden" id="schoolId" value=""/>
								<div class="formList">
                 					<label><em>*</em>入学学年：</label>
				                  	<div class="info">
					                    <select id="year" onchange="autoComplete()">
									        <option selected="selected" value="">请选择</option>
											<c:forEach var="ay" items="${academicYears}">
												<option  value="${ay.academicYear}">${ay.academicYear}</option>
											</c:forEach>
									    </select>
									    <c:forEach var="ay" items="${academicYears}">
									    	<input type="hidden" id="end_${ay.academicYear}" value="<fmt:formatDate value="${ay.endTime }" pattern="yyyy-MM-dd"/>"/>
										</c:forEach>
				                  	</div>
				                </div>
								<div class="formList">
                 					<label><em>*</em>学段/年级：</label>
				                  	<div class="info">
					                   	<select id="stage" onchange="autoComplete()">
									        <option selected="selected" value="">请选择</option>
											<c:forEach var="relation" items="${stages}">
												<option  value="${relation.stageName}">${relation.stageName}</option>
											</c:forEach>
									    </select>
										<select id="grade" disabled="disabled">
									        <option selected="selected" value="">请选择</option>
									    </select>
				                  	</div>
				                </div>
								<div class="formList">
                 					<label><em>*</em>班级类型：</label>
				                  	<div class="info">
					                   	<select id="classType">
									        <option selected="selected" value="">请选择</option>
											<c:forEach var="relation" items="${types}">
												<option  value="${relation.classTypeName}">${relation.classTypeName}</option>
											</c:forEach>
									    </select>
				                  	</div>
				                </div>
								<div class="formList">
                 					<label><em>*</em>班级号：</label>
				                  	<div class="info">
					                   	<input type="text" maxlength="6" id="classNumber" onkeyup="value=value.replace(/[^\d]/g,'')"/>
				                  	</div>
				                </div>
								<div class="formList">
                 					<label>任课教师：</label>
				                  	<div class="info info01" id="teacherArea">
					                   	<c:forEach var="relation" items="${allSubjects}" varStatus="sta">
					                   		<div class="infoBox" id="teacher_div_${sta.count}">
								                <label>${relation.subjectName}:</label>
								                <div class="info">
								                	<select id="teacher_select_${sta.count}" style="width: 120px;">
										        		<option>请选择</option>
										    		</select>
								                </div>
								                <input type="hidden" value="${relation.subjectName}" id="teacher_value_${sta.count}"/>
								          	</div>
										</c:forEach>
				                  	</div>
				                </div>
           					</div>
           				</div>
           				<div class="conBtnWrap conBtnWrap01">
				        	<div class="BtnOrange30">
				              	<a href="javascript:void(0)" class="btnSave" id="btnSave" onclick="add()">确定</a>
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

