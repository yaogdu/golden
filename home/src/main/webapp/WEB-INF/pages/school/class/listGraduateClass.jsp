<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css"/>
	<script src="${static_ctx}/static/js/school/class/listGraduateClass.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/lib/jquery.pagebar.js" type="text/javascript"></script>
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
        				<p>班级管理</p>
        				<c:if test="${currentYear != null }"><p class="fr">当前学年：<em>${currentYear }</em></p></c:if>        				
        			</div>
        			<div class="mainPart">
        				<div class="conBox">
        					<input type="hidden" id="context" value="${static_ctx}"/>
							<input type="hidden" id="currentPage" value="${currentPage}"/>
							<input type="hidden" id="totalPage" value="${totalPage}"/>
							<input type="hidden" id="totalCount" value="${totalCount}"/>
							<div class="formTab formTab01">
			                	<ul class="TabTit">
			                  		<li><a href="${static_ctx}/school/class/toListPage">在读</a></li>
			                  		<li class="current"><a href="${static_ctx}/school/class/toListPage?status=2">已毕业</a></li>
			                	</ul>
			              	</div>
            				<div class="conFormList">
            					<div class="conForm">
            						<label>入学学年：</label>
            						<div class="info">
					                    <select id="academicYear">
									    	<option selected="selected" value="">请选择</option>
											<c:forEach var="ay" items="${years}">
												<option  value="${ay.academicYear}" <c:if test="${academicYear == ay.academicYear }">selected="selected"</c:if>>${ay.academicYear}</option>
											</c:forEach>
									     </select>
				                  	</div>
            					</div>
            					<div class="conForm">
            						<label>学段/班级：</label>
            						<div class="info">
					                    <select id="stage">
									    	<option selected="selected" value="">请选择</option>
											<c:forEach var="item" items="${stages}">
												<option  value="${item.stageName}" <c:if test="${stage == item.stageName }">selected="selected"</c:if>>${item.stageName}</option>
											</c:forEach>
										</select>
										<input type="text" style="width: 80px;" maxlength="6" id="classNumber" value="${classNumber }" onkeyup="value=value.replace(/[^\d]/g,'')"/>	
				                  	</div>
            					</div>
            					<div class="conForm">
            						<label>班级类型：</label>
            						<div class="info">
					                    <select id="type">
									    	<option selected="selected" value="">请选择</option>
											<c:forEach var="item" items="${types}">
												<option  value="${item.classTypeName}" <c:if test="${type == item.classTypeName }">selected="selected"</c:if>>${item.classTypeName}</option>
											</c:forEach>
										</select>
				                  	</div>
            					</div>
            					<div class="conForm">
            						<div class="info">
            							<div class="BtnBlue22"><a href="javascript:void(0)" class="btnSave" id="btnSave" onclick="query()">查询</a></div>
				                  	</div>
            					</div>
        					</div>
        					<div class="conShow">
              					<div class="list">
              						<table class="listTable">
					                    <thead>
					                      	<tr>
						                        <th>入学年级</th>
						                        <th>学段</th>
						                        <th>班级</th>
						                        <th>班级类型</th>
						                        <th>学生数</th>
						                        <th>毕业时间</th>
						                        <th width="200px">操作</th>
					                      	</tr>
					                    </thead>
					                    <tbody>
					                    	<c:forEach var="item" items="${classList }">
												<tr>
													<td>${item.academicYear }</td>
													<td>${item.stage }</td>
													<td>${item.classNumber }班</td>
													<td>${item.type }</td>
													<td>${item.studentAmount }</td>
													<td><fmt:formatDate value="${item.graduateTime }" pattern="yyyy-MM-dd"/></td>
													<td>
														<a href="${static_ctx}/school/class/toViewTeacherPage?classId=${item.id }">查看教师</a>&nbsp;
														<a href="${static_ctx}/school/class/toViewStudentPage?classId=${item.id }">查看学生</a>
													</td>
													
												</tr>
											</c:forEach>
					                    </tbody>
				                    </table>
				                    <div id="pagebar"></div>
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

