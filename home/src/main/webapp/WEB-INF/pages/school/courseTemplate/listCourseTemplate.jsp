<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<script src="${static_ctx}/static/js/school/courseTemplate/listCourseTemplate.js" type="text/javascript"></script>
	<title>课程模板管理</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">
        				<p>课程模板管理</p>
        			</div>
        			<div class="mainPart">
        				<div class="conBox">
        					<input type="hidden" id="context" value="${static_ctx}"/>
            				<div class="conFormList">
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
            						<label>年级：</label>
            						<div class="info">
										<select id="grade">
											<c:choose>
												<c:when test="${grades != null && grades.size() > 0 }">
													<option selected="selected" value="">请选择</option>
													<c:forEach var="item" items="${grades}">
														<option  value="${item.gradeName}" <c:if test="${grade == item.gradeName }">selected="selected"</c:if>>${item.gradeName}</option>
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
            						<label>状态：</label>
            						<div class="info">
					                    <select id="status">
									    	<option value="">请选择</option>
									    	<option value="3" <c:if test="${status == 3 }">selected="selected"</c:if>>未设置</option>
									    	<option value="1" <c:if test="${status == 1 }">selected="selected"</c:if>>启用</option>
									    	<option value="2" <c:if test="${status == 2 }">selected="selected"</c:if>>停用</option>
										</select>
				                  	</div>
            					</div>
            					<div class="conForm">
            						<div class="info">
            							<div class="BtnBlue22"><a href="javascript:void(0)" class="btnSave" onclick="query()">查询</a></div>
				                  	</div>
            					</div>
        					</div>
        					<c:if test="${list == null || list.size() <= 0 }">
        						<div class="tipsBox">共有<em>0</em>条结果</div>
        					</c:if>
        					<div class="conShow">
              					<div class="list">
              						<table class="listTable">
					                    <thead>
					                      	<tr>
						                        <th>学段</th>
						                        <th>年级</th>
						                        <th>学科</th>
						                        <th width="90px">最近编辑人</th>
						                        <th width="120px">最近编辑时间</th>
						                        <th>状态</th>
						                        <th width="150px">操作</th>
					                      	</tr>
					                    </thead>
					                    <tbody>
					                    	<c:forEach var="item" items="${list }">
												<tr>
													<td>${item.stage }</td>
													<td>${item.grade }</td>
													<td>${item.subject }</td>
													<td>${item.operatorName }</td>
													<td><fmt:formatDate value="${item.updateTime }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
													<td id="status_value_${item.id }">
														<c:if test="${ item.status == 1}">启用</c:if>
														<c:if test="${ item.status == 2}">停用</c:if>
														<c:if test="${ item.status == 3}">未设置</c:if>
													</td>
													<td>
														<c:choose>
															<c:when test="${ item.status == 1}">
																<span class="oper">
																	<a href="${static_ctx}/school/ct/toViewPage?courseTemplateId=${item.id }">查看</a>&nbsp;
																	<a href="${static_ctx}/school/ct/toUpdatePage?courseTemplateId=${item.id }">编辑</a>&nbsp;
																	<a id="toggleStatus_${item.id }" href="javascript:void(0)">停用</a>
																</span>
															</c:when>
															<c:when test="${ item.status == 2}">
																<span class="oper">
																	<a href="${static_ctx}/school/ct/toViewPage?courseTemplateId=${item.id }">查看</a>&nbsp;
																	<a href="${static_ctx}/school/ct/toUpdatePage?courseTemplateId=${item.id }">编辑</a>&nbsp;
																	<a id="toggleStatus_${item.id }" href="javascript:void(0)">启用</a>
																</span>
															</c:when>
															<c:otherwise>
																<span class="oper">
																	<a href="${static_ctx}/school/ct/toUpdatePage?courseTemplateId=${item.id }">编辑</a>
																</span>
															</c:otherwise>
														</c:choose>
													</td>
												</tr>
											</c:forEach>
					                    </tbody>
				                    </table>
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

