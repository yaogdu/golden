<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<script src="${static_ctx}/static/js/school/teacher/addTeacherNew.js" type="text/javascript"></script>
	<title>添加教师</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle"><p>添加教师</p></div>
        			<div class="mainPart">
           				<div class="conFormWrap">
           					<div class="formTab">
				              	<ul class="TabTit">
					                <li class="current"><a href="javascript:void(0)">单个添加</a></li>
					                <li><a href="${static_ctx}/school/teacher/toBatchAddPage">批量导入</a></li>
				              	</ul>
				            </div>
           					<div class="formCon formCon02">
           						<input type="hidden" id="context" value="${static_ctx}"/>
								<input type="hidden" id="schoolId" value=""/>
								<div class="formList">
                 					<label><em>*</em>姓名：</label>
				                  	<div class="info">
					                    <input type="text" id="teacherName" class="inputText" value="" maxlength="10"/>
				                  	</div>
				                  	<p class="infoHint infoHint01">姓名可以重复</p>
				                </div>
								<div class="formList">
                 					<label><em>*</em>学段：</label>
				                  	<div class="info">
					                   	<select id="stage" onchange="changeStage();">
									        <option selected="selected" value="">请选择</option>
											<c:forEach var="relation" items="${stages}">
												<option  value="${relation.stageName}">${relation.stageName}</option>
											</c:forEach>
									    </select>
				                  	</div>
				                </div>
				                <div class="formList">
                 					<label><em>*</em>学科：</label>
				                  	<div class="info">
					                   	<select id="subject" disabled="disabled">
									        <option selected="selected" value="">请选择</option>
									    </select>
				                  	</div>
				                </div>
								<div class="formList">
                 					<label>性别：</label>
				                  	<div class="info">
					                   	<select id="gender">
									        <option selected="selected" value="">请选择</option>
											<option value="1">男</option>
											<option value="0">女</option>
									    </select>
				                  	</div>
				                </div>
				                <div class="formList">
                 					<label>手机：</label>
				                  	<div class="info">
					                    <input type="text" id="tel" class="inputText" value="" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"/>
				                  	</div>
				                  	<p class="infoHint infoHint01">只能为11位数字</p>
				                </div>
				                <div class="formList">
                 					<label>邮箱：</label>
				                  	<div class="info">
					                    <input type="text" id="email" class="inputText" value="" maxlength="64"/>
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

