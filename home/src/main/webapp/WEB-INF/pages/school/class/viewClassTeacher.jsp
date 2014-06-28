<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css"/>
	<script src="${static_ctx}/static/js/lib/jquery.pagebar.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/school/class/viewClassTeacher.js" type="text/javascript"></script>
	<title>查看教师</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">
        				<p>查看教师</p>
		           		<div class="operBtn">
		           			<div class="BtnWhite28">
		             			<a href="${static_ctx}/school/class/toViewTeacherChangeHistoryPage?classId=${klass.id }" class="btnSave">教师变更历史</a>
		             		</div>
		             		<div class="BtnWhite28">
		             			<a href="javascript:window.history.back(-1);" class="btnSave"><span class="returnIco"></span>返回</a>
		             		</div>
		           		</div>			
        			</div>
        			<div class="mainPart">
        				<div class="conBox">
        					<input type="hidden" id="context" value="${static_ctx}"/>
							<input type="hidden" id="currentPage" value="${currentPage}"/>
							<input type="hidden" id="totalPage" value="${totalPage}"/>
							<input type="hidden" id="totalCount" value="${totalCount}"/>
							<input type="hidden" id="classId" value="${klass.id }"/>
            				<div class="conFormList">
								<div class="conForm">
				                	<label>入学学年：</label>
					                <div class="info">
					                  	<span class="infoLabel">${klass.academicYear }</span>
					                </div>
		              			</div>
            					<div class="conForm">
				                	<label>学段：</label>
					                <div class="info">
					                  	<span class="infoLabel">${klass.stage }</span>
					                </div>
		              			</div>		
            					<div class="conForm">
				                	<label>年级：</label>
					                <div class="info">
					                  	<span class="infoLabel">${klass.grade }</span>
					                </div>
		              			</div>
		              			<div class="conForm">
				                	<label>班级：</label>
					                <div class="info">
					                  	<span class="infoLabel">${klass.classNumber }班</span>
					                </div>
		              			</div>
		              			<div class="conForm">
				                	<label>类型：</label>
					                <div class="info">
					                  	<span class="infoLabel">${klass.type }</span>
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
						                        <th>姓名</th>
								              	<th>系统号</th>
								              	<th>登陆名</th>
								              	<th>学科</th>
								              	<th>状态</th>
					                      	</tr>
					                    </thead>
					                    <tbody>
					                    	<c:forEach var="item" items="${classTeachers }">
												<tr>
													<td>${item.teacherName }</td>
													<td>${item.systemId }</td>
													<td>${item.loginName }</td>
													<td>${item.subject }</td>
													<td>
														<c:if test="${item.status == 0 }">停用</c:if>
														<c:if test="${item.status == 1 }">启用</c:if>
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

