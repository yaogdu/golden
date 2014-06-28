<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css"/>
	<script src="${static_ctx}/static/js/school/teacher/listTeacher.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/lib/jquery.pagebar.js" type="text/javascript"></script>
	<title>教师管理</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">
        				<p>教师管理</p>
        				<div class="operBtn">
				            <div class="BtnWhite28">
				              	<a class="btnSave" href="javascript:void(0)" onclick="exportExcel()">批量导出</a>
				            </div>
			          	</div>     				
        			</div>
        			<div class="mainPart">
        				<div class="conBox">
        					<input type="hidden" id="context" value="${static_ctx}"/>
							<input type="hidden" id="currentPage" value="${currentPage}"/>
							<input type="hidden" id="totalPage" value="${totalPage}"/>
							<input type="hidden" id="totalCount" value="${totalCount}"/>
            				<div class="conFormList">
            					<div class="conForm">
            						<label>登录名：</label>
            						<div class="info">
					                    <input style="width: 80px;" type="text" id="loginName" value="${loginName }" maxlength="10" onkeyup="value=value.replace(/[^\a-zA-Z0-9]/g,'')"/>
				                  	</div>
            					</div>
            					<div class="conForm">
            						<label>姓名：</label>
            						<div class="info">
										<input style="width: 80px;" type="text" id="teacherName" value="${name }" maxlength="10" onkeyup="value=value.replace(/[^\a-zA-Z0-9\u4E00-\u9FA5]/g,'')"/>	
				                  	</div>
            					</div>
            					<div class="conForm">
            						<label>学段：</label>
            						<div class="info">
					                    <select id="stage" onchange="return changeStage();">
									    	<option selected="selected" value="">请选择</option>
											<c:forEach var="item" items="${stages}">
												<option  value="${item.stageName}" <c:if test="${stage == item.stageName }">selected="selected"</c:if>>${item.stageName}</option>
											</c:forEach>
										</select>
				                  	</div>
            					</div>
            					<div class="conForm">
            						<label>学科：</label>
            						<div class="info">
					                    <select id="subject">
									    	<c:choose>
												<c:when test="${subjects != null && subjects.size() > 0 }">
													<option selected="selected" value="">请选择</option>
													<c:forEach var="item" items="${subjects}">
														<option  value="${item.subjectName}" <c:if test="${subject == item.subjectName }">selected="selected"</c:if>>${item.subjectName}</option>
													</c:forEach>
												</c:when>
												<c:otherwise>
													<option selected="selected" value="">请选择</option>
												</c:otherwise>
											</c:choose>
										</select>
				                  	</div>
            					</div>
            					<div class="conForm">
            						<div class="info">
            							<div class="BtnBlue22"><a href="javascript:void(0)" class="btnSave" onclick="query()">查询</a></div>
				                  	</div>
            					</div>
        					</div>
        					<c:if test="${totalCount <= 0 }">
        						<div class="tipsBox">共有<em>${totalCount}</em>条结果</div>
        					</c:if>
        					<div class="conShow">
              					<div class="list">
              						<table class="listTable">
					                    <thead>
					                      	<tr>
						                        <th>系统号</th>
						                        <th>登录名</th>
						                        <th>姓名</th>
						                        <th>学段</th>
						                        <th>学科</th>
						                        <th>状态</th>
						                        <th width="200px">操作</th>
					                      	</tr>
					                    </thead>
					                    <tbody>
					                    	<c:forEach var="item" items="${teacherList }">
												<tr>
													<td>${item.systemId }</td>
													<td>${item.loginName }</td>
													<td>${item.name }</td>
													<td>${item.stage }</td>
													<td>${item.subject }</td>
													<td id="status_value_${item.id }">
														<c:if test="${item.status == 1 }">启用</c:if>
														<c:if test="${item.status == 0 }">停用</c:if>
													</td>
													<td>
														<span class="oper"><a href="${static_ctx}/school/teacher/toViewTeacher?teacherId=${item.id }">查看</a>&nbsp;
														<a href="${static_ctx}/school/teacher/toUpdatePage?teacherId=${item.id }">编辑</a>&nbsp;
														<c:if test="${item.status == 1 }">
															<a id="toggleStatus_${item.id }" href="javascript:void(0)">停用</a>&nbsp;
														</c:if>
														<c:if test="${item.status == 0 }">
															<a id="toggleStatus_${item.id }" href="javascript:void(0)">启用</a>&nbsp;
														</c:if>
														<a href="javascript:void(0)" onclick="resetPassword(${item.id })">重置密码</a></span>
													</td>
												</tr>
											</c:forEach>
					                    </tbody>
				                    </table>
				                    <div id="pagebar"></div>
        						</div>
        					</div>
        				</div>
        			
        			
<!--         				<div class="conPageWrap" id="pagebar"></div> -->
        			</div>
        		</div>
        	</div>
        </div>
        <%@include file="/WEB-INF/pages/commons/school/footer.jsp"%>
	</div>
</body>
</html>

